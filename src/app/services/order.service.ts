import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private api = `${environment.businessApiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<any[]>(this.api);
  }

  createOrder(order: any) {
    return this.http.post(this.api, order);
  }
}