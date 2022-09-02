import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import { productModel } from '../model/employee.model';
import { ProductapiService } from '../_services/productapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formvalue !: FormGroup;
  productModelObj : productModel = new productModel();
  productDataObj !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  user = {localId:"defaultID", userName:"Admin"}
  
  constructor(private auth:AuthService,private formbuilder:FormBuilder, private api:ProductapiService) { }

  ngOnInit(): void {
    this.auth.canAccess();

    if(this.auth.isAuthenticated()){
      //Call user detilas Service
      this.auth.details().subscribe({
        next:data=>{
          this.user.localId = data.users[0].localId;
          this.user.userName = data.users[0].displayName;
        }
      });
      
        this.formvalue = this.formbuilder.group({
          productName:[''],
          productPrice:[''],
          productType:[''],
          productQty:['']
        })
        this.getEmployeeAll();
    }
  }

  clickAddProduct(){
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postProductDetails(){
    this.productModelObj.productName=this.formvalue.value.productName;
    this.productModelObj.productPrice=this.formvalue.value.productPrice;
    this.productModelObj.productQty=this.formvalue.value.productQty;
    this.productModelObj.productType=this.formvalue.value.productType;

    this.api.postEmployee(this.productModelObj)
    .subscribe({
      next:data=>{
        console.log(data);
        alert("Successfully Added...");
        //var ref = document.getElementById("cancel");
        //ref?.click();
        this.formvalue.reset();
        this.getEmployeeAll();
      },
      error:data=>{
        console.log(data.error.error.errorMessage);
        alert("Something went wrong!!")
      }
    })
  }

  getEmployeeAll()
  {
    this.api.GetEmployee()
    .subscribe(res=> {
      this.productDataObj=res;
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Row Deleted successfully");
      this.getEmployeeAll();
    })
  }

  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    
    this.productModelObj.id=row.id;
    this.formvalue.controls["productName"].setValue(row.productName);
    this.formvalue.controls["productPrice"].setValue(row.productPrice);
    this.formvalue.controls["productType"].setValue(row.productType);
    this.formvalue.controls["productQty"].setValue(row.productQty);
  }

updateProductDetails(){
  this.productModelObj.productName=this.formvalue.value.productName;
  this.productModelObj.productPrice=this.formvalue.value.productPrice;
  this.productModelObj.productQty=this.formvalue.value.productQty;
  this.productModelObj.productType=this.formvalue.value.productType;

  this.api.UpdateEmployee(this.productModelObj, this.productModelObj.id)
  .subscribe(res=>{
    alert("updated successfully");
    this.getEmployeeAll();
    this.formvalue.reset();
  })
}
}
