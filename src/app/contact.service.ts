import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './Contact';
import { environment } from 'src/environments/environment.development';

@Injectable({providedIn: 'root'})
export class ContactService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private _httpClient: HttpClient){ }

  public getContacts(): Observable<Contact[]> {
    return this._httpClient.get<Contact[]>(`${this.apiServerUrl}/contact/all`);
  }

  public addContact(contact: Contact): Observable<Contact> {
    return this._httpClient.post<Contact>(`${this.apiServerUrl}/contact/add`,contact);
  }

  public deleteContact(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.apiServerUrl}/contact/delete/${id}`);
  }

  public updateContact(contact: Contact): Observable<Contact> {
    return this._httpClient.put<Contact>(`${this.apiServerUrl}/contact/update`,contact);
  }

  public findContactbyId(id: number): Observable<Contact> {
    return this._httpClient.get<Contact>(`${this.apiServerUrl}/contact/find/${id}`);
  }

}
