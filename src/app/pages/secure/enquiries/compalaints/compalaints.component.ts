import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-compalaints',
  templateUrl: './compalaints.component.html',
  styleUrls: ['./compalaints.component.scss']
})
export class CompalaintsComponent implements OnInit {

  complaintForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CompalaintsComponent>,
    public utilServices: UtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    // console.log(this.data)
    this.complaintForm = this.fb.group({
      message: new FormControl('', Validators.required),
    })
  }

}
