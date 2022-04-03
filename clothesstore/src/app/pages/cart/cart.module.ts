import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '@cart/cart.component';
import { CartRoutingModule } from '@cart/cart-routing.module';
import { ProductsModule } from '@products/products.module';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, CartRoutingModule, ProductsModule]
})
export class CartModule {}
