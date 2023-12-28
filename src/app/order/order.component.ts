import {Component, OnInit} from '@angular/core';
import {OrderService} from "./order.service";
import {Router} from "@angular/router";
import {Order} from "./order.model";
import {AuthService} from "../auth/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [AuthService],
})
export class OrderComponent implements OnInit {
  isAdmin: boolean | undefined;
  isLoggedIn: boolean | undefined;

  constructor(
    protected authService: AuthService,
    private orderService: OrderService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isUserAdmin();
    this.isLoggedIn = this.authService.isUserLoggedIn();
  }

  processOrderDetails(
    firstName: string,
    lastName: string,
    streetName: string,
    houseNumber: string,
    zipcode: string,
    country: string,
    price: string
  ) {
    if (!firstName || !lastName || !streetName || !houseNumber || !zipcode || !country || !price) {
      this.toastrService.error('Not all fields have been filled.');
      return;
    }

    let order: Order = new Order(
      firstName, lastName, streetName, Number(houseNumber), zipcode, country, Number(price)
    );

    this.orderService.createOrder(order);
  }
}
