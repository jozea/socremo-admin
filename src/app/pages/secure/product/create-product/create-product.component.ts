import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  field1:any;
  field2:any;
  field3:any;
  field4:any;
  loading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  close() {
    
  }

}
