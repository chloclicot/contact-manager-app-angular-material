import { Component, Input, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Contact } from "./Contact";

@Component({
    selector: 'addeditDialog',
    templateUrl: 'addEditDialog.component.html',
    styleUrls: [],
  })
  export class addEditDialog{
    @Input() selectedContact: Contact
    constructor(public dialogRef: MatDialogRef<string>, @Inject(MAT_DIALOG_DATA) public data) {}

    
  
    addContact(form: NgForm, mode:string){
        console.log(mode);
        
        this.dialogRef.close(form.value);
    }
  }