import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CartService } from '@appShared/services/cart.service';
import { ItemCart } from '@appShared/models/shared/cart.model';
import { Observable } from 'rxjs';
import SwAlert from 'sweetalert2';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cart$: Observable<ItemCart[]> = this.cartSvc.cart;

  constructor(public cartSvc: CartService, private router: Router, @Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.scrollTop = 0;
  }

  deleteItem(productId: string, productName: string) {
    SwAlert.fire({
      title: 'Está seguro?',
      text: 'Si eliminara el item con todos su productos del carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((resultDelete) => {
      if (resultDelete.isConfirmed) {
        this.cartSvc.removeItem(productId, productName);
        SwAlert.fire(`El carrito fue vaciado! `, '', 'success').then(() => {
          if (this.cartSvc.totalItems === 0) {
            this.router.navigate(['/']).then();
          }
        });
      }
    });
  }

  updateItem(qty: number, productId: string) {
    this.cartSvc.updateItem(qty, productId);
  }

  onClear() {
    SwAlert.fire({
      title: 'Está seguro?',
      text: 'Si eliminarán todos los productos del carrito',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar!',
      cancelButtonText: 'Cancelar'
    }).then((resultDelete) => {
      if (resultDelete.isConfirmed) {
        this.cartSvc.clear();
        this.router.navigate(['/']).then();
        SwAlert.fire(`El carrito fue vaciado! `, '', 'success').then();
      }
    });
  }
}
