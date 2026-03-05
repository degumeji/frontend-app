import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];
  
  showErrorModal = false;
  errorMessage = '';

  constructor(
    public auth: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  handleError(error: any) {
    this.errorMessage =
      error?.error?.message ||
      error?.message ||
      'Ocurrió un error al cargar las órdenes.';

    this.showErrorModal = true;
  }

  closeModal() {
    this.showErrorModal = false;
  }
}