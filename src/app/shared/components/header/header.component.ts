import { Component } from '@angular/core';
import { CartService } from '@appShared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  query: string = '';
  sidebarOpened = false;

  constructor(public cartSvc: CartService) {}
}
