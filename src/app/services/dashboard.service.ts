import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private apiUrl = environment.businessApiUrl;

  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get<any>(`${this.apiUrl}/dashboard/stats`);
  }
}
