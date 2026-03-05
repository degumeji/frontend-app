import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'
})
export class ClientsComponent implements OnInit {

  clients: any[] = [];
  client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  // 🔥 NUEVO
  showErrorModal = false;
  errorMessage = '';

  constructor(public auth: AuthService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  save() {
    this.clientService.createClient(this.client).subscribe({
      next: () => {
        this.loadClients();
        this.client = { firstName:'', lastName:'', email:'', phone:'' };
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  delete(id: number) {
    this.clientService.deleteClient(id).subscribe({
      next: () => {
        this.loadClients();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  // 🔥 MÉTODO CENTRALIZADO
  handleError(error: any) {
    this.errorMessage =
      error?.error?.message ||
      error?.message ||
      'Ocurrió un error inesperado.';

    this.showErrorModal = true;
  }

  closeModal() {
    this.showErrorModal = false;
  }
}