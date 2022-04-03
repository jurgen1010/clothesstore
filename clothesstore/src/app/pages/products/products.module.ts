import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from '@products/components/products-list/products-list.component';
import { ProductsRoutingModule } from '@products/products-routing.module';
import { ProductCardComponent } from '@products/components/product-card/product-card.component';
import { ProductsComponent } from '@products/products.component';
import { SharedModule } from '@appShared/shared.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [ProductsComponent, ProductCardComponent, ProductsListComponent],
  exports: [ProductsListComponent, ProductCardComponent],
  imports: [CommonModule, ProductsRoutingModule, SharedModule, ScrollingModule]
})
export class ProductsModule {}
