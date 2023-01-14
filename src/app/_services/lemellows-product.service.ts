import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LemellowsProductService {

  constructor(private http: HttpClient) { }

  GetAllProducts() {
    return this.http.get<any>("https://lemellos-product-api.herokuapp.com/lemellows_product")
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
