import { Component, Input, OnInit } from '@angular/core';
import { FileUploadService } from '../../service/file-upload.service';
import { FileUpload } from '../../model/file-upload.model';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUploads!: FileUpload;
  
  constructor(private uploadService:FileUploadService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}
