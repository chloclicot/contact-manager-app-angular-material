import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import{Contact} from './Contact'
import { ContactService } from './contact.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title = 'contactmanagerapp';
  public contacts : Contact[];
  nbContacts: number;
  searchIcon = faSearch;
  selectedContact : Contact;
  closeResult = '';

  constructor(private contactService : ContactService,public modalService: NgbModal){}

  public getContacts(): void{
    this.contactService.getContacts().subscribe(response=>{
      this.contacts = response;
      this.nbContacts = this.contacts.length;
      console.table(this.contacts);
    });
  }

  ngOnInit(): void {
      this.getContacts();
  }

  invContacts(): void{
    this.contacts.reverse();
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  onAddContact(form : NgForm): void{
    this.contactService.addContact(form.value).subscribe(res =>{
      this.getContacts();
    });
  }

  onUpdateContact(form: NgForm, id : number){
    console.log(form.value);
    this.contactService.updateContact(form.value,id).subscribe(res =>{
      this.getContacts();
      this.contactService.findContactbyId(id).subscribe(res =>{
        this.selectedContact = res;
      })
    })
  }

  openModal(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      switch (result) {
        case 'Delete click':
          this.contactService.deleteContact(this.selectedContact.id).subscribe(res =>
            {
              this.getContacts();
              this.selectedContact = null;
            })
          break;
        default:
          break;
      };


    }, 
    );
  }

}
