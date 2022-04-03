import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '@appShared/models/Products/product.model';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent {
  @Input() products: Product[] = [];
  customOptions: OwlOptions = {
    loop: true,
    autoHeight: true,
    autoWidth: true,
    lazyLoad: true,
    fluidSpeed: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    autoplay: true,
    autoplayHoverPause: true,
    mergeFit: true,
    autoplayTimeout: 4000,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      480: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  };
}
