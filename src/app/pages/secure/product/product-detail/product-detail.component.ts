import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetails: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
    this.productDetails = this.data.row
    // console.log(this.productDetails.comment, this.data)
  }

  openDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80vw';
    dialogConfig.height = 'auto';
    dialogConfig.data = { row };
    const dialogRef = this.dialog.open(UpdateProductComponent, dialogConfig);
    // console.log(dialogRef)

    // dialogRef.afterClosed().subscribe(_ => {
    //   if (_ === 'refresh') {
    //     // this.handleLoanRequest(this.limit, this.page, this.loanRequestModel)

    //   }
    // });
  }
  
  close(): void {
    this.dialogRef.close();
  }

}
