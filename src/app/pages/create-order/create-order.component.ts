import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html'
})
export class CreateOrderComponent implements OnInit {

  clients: any[] = [];

  order = {
    client_id: '',
    orderDate: '',
    total: '',
    status: 'Pending'
  };
  
  showErrorModal = false;
  showSuccessModal = false;
  message = '';

  constructor(
    public auth: AuthService,
    private orderService: OrderService,
    private clientService: ClientService
  ) {}

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
    this.orderService.createOrder(this.order).subscribe({
      next: () => {
        this.message = 'Orden creada correctamente.';
        this.showSuccessModal = true;

        this.order = {
          client_id:'',
          orderDate:'',
          total:'',
          status:'Pending'
        };
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  handleError(error: any) {
    this.message =
      error?.error?.message ||
      error?.message ||
      'Ocurrió un error inesperado.';

    this.showErrorModal = true;
  }

  closeModal() {
    this.showErrorModal = false;
    this.showSuccessModal = false;
  }
}