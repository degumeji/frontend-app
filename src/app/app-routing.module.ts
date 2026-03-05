import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';

import { ClientsComponent } from './pages/clients/clients.component';
import { CreateOrderComponent } from './pages/create-order/create-order.component';
import { OrdersComponent } from './pages/orders/orders.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  { path: 'clients', component: ClientsComponent, canActivate: [authGuard] },
  { path: 'create-order', component: CreateOrderComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' }
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
