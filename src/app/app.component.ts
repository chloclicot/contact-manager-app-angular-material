import { Component,OnInit} from '@angular/core';
import{Contact} from './Contact'
import { ContactService } from './contact.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, } from '@angular/material/dialog';
import { addEditDialog } from './addEditDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],

})
export class AppComponent implements OnInit{
  title = 'contactmanagerapp';
  public contacts : Contact[];
  public filteredContacts: Contact[];
  nbContacts: number;
  searchIcon = faSearch;
  selectedContact : Contact;
  closeResult = '';
  search: string = '';
  tri: string = 'A-Z';
  displayDate = '';

  constructor(private contactService : ContactService,public dialog: MatDialog){}

  public getContacts(): void{
    this.contactService.getContacts().subscribe(response=>{
      this.contacts = response;
      this.filteredContacts = response;
      this.nbContacts = this.contacts.length;
      console.table(this.contacts);
    });
  }

  ngOnInit(): void {
      this.getContacts();
  }

  searchContact(): void{
    this.filteredContacts = this.contacts.filter(c => c.name.toLowerCase().includes(this.search.toLowerCase()) 
    ||  c.surname.toLowerCase().includes(this.search.toLowerCase()));
    this.selectedContact = null;
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    var date = new Date(this.selectedContact.birthday);
    this.displayDate = date.toLocaleString('default',{day:'2-digit'})+" "
    +date.toLocaleString('default', { month: 'long' })
    +" ("+this.selectedContact.age+") ans";
  }


  openDialog(mode:string): void {
    switch (mode) {
      case 'add':
        this.dialog.open(addEditDialog,{data:{mode:'add'}}).afterClosed().subscribe(res=>{
          if(res!=undefined){
            console.table(res);
            console.log(res.age);
            
          this.contactService.addContact(res).subscribe(res=>
            {this.getContacts();}
          )
        }
          })
        break;
      case 'edit':
        console.log('edit');
        this.dialog.open(addEditDialog,{data:{mode:mode,selectedContact:this.selectedContact}}).afterClosed().subscribe(res=>{
          console.log(res);
          
          this.contactService.updateContact(res).subscribe(res=>{
            this.getContacts();
            this.contactService.findContactbyId(this.selectedContact.id).subscribe(res =>{
              this.selectedContact = res;
            })
          })
        })
        break;
      case 'warn':
        console.log('warn');
        this.dialog.open(addEditDialog,{data:{mode:mode,selectedContact:this.selectedContact}}).afterClosed().subscribe(res=>{
          if(res!=undefined){
            this.contactService.deleteContact(this.selectedContact.id).subscribe(res =>
              {
                this.getContacts();
                this.selectedContact = null;
              })
          }
        })
        break;
      default:
        break;
    }

    }

    toggleSort(){
      if(this.tri == 'A-Z'){
        this.contacts.reverse();
        this.tri = 'Z-A';
      }
      else{
        this.getContacts();
        this.tri = 'A-Z';
      }
    
  
  }

 
  

}


