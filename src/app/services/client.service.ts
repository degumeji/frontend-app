import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private api = `${environment.businessApiUrl}/clients`;

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<any[]>(this.api);
  }

  createClient(client: any) {
    return this.http.post(this.api, client);
  }

  deleteClient(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}