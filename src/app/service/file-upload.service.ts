import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { observable, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { FileUpload } from '../model/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/upload';
  private DbName = 'uploads'
  public fileuploadList= new Observable<FileUpload>();

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  
  //dbdetails=this.db.database;

  //Push the file on fireBase Container
  pushFileToStorage(fileupload: FileUpload): Observable<number | undefined>{
    const filePath = this.basePath + "/" + fileupload.file.name;
        const storageRef = this.storage.ref(filePath);
    const uploadTask=this.storage.upload(filePath, fileupload.file);
    uploadTask.snapshotChanges().pipe(
      finalize(()=>{
          storageRef.getDownloadURL().subscribe(downloadURL=>{
            fileupload.url = downloadURL;
            fileupload.name = fileupload.file.name;
            this.saveFileData(fileupload);
          })
      })
    ).subscribe();
    return uploadTask.percentageChanges();
  }

  private saveFileData(fileupload:FileUpload):void{
    this.db.list(this.DbName).push(fileupload);
    //this.fileuploadList.
  }

  getListFiles(): Observable<FileUpload>{
      //return this.fileuploadList;
      return this.fileuploadList;
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.DbName, ref =>
      ref.limitToLast(numberItems));
  }
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.DbName).remove(key);
  }
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
