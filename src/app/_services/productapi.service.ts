import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductapiService {

  constructor(private http:HttpClient) { }

  postEmployee(data:any){
    return this.http.post<any>("https://lemellos-product-api.herokuapp.com/product", data)
    .pipe(map((res:any)=>{
        return res;
    }))
  }
  
  GetEmployee(){
    return this.http.get<any>("https://lemellos-product-api.herokuapp.com/product")
    .pipe(map((res:any)=>{
        return res;
    }))
  }

  UpdateEmployee(data:any, id:number){
    return this.http.put<any>("https://lemellos-product-api.herokuapp.com/product/"+id, data)
    .pipe(map((res:any)=>{
        return res;
    }))
  }

  deleteEmployee(id:number){
    return this.http.delete<any>("https://lemellos-product-api.herokuapp.com/product/"+id)
    .pipe(map((res:any)=>{
        return res;
    }))
  }

}
