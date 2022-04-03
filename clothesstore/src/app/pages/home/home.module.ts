import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesCarouselComponent } from '@home/components/images-carousel/images-carousel.component';
import { ProductsCarouselComponent } from '@home/components/products-carousel/products-carousel.component';
import { HomeComponent } from '@home/home.component';
import { HomeRoutingModule } from '@home/home-routing.module';
import { SharedModule } from '@appShared/shared.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsModule } from '@products/products.module';

@NgModule({
  declarations: [HomeComponent, ImagesCarouselComponent, ProductsCarouselComponent],
  exports: [ImagesCarouselComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule, CarouselModule, SharedModule, ProductsModule]
})
export class HomeModule {}
