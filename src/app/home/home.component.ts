import { Component, OnInit } from '@angular/core';
import { LemellowsProductService } from '../_services/lemellows-product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  lemellowsDataObj !:any;
  constructor(private api: LemellowsProductService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct()
  {
    this.api.GetAllProducts()
    .subscribe(res=> {
      this.lemellowsDataObj=res;
    })
  }

}
