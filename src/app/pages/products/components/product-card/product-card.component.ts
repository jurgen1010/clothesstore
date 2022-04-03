import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '@appShared/models/Products/product.model';
import { CartService } from '@appShared/services/cart.service';
import { ItemCart } from '@appShared/models/shared/cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges {
  @Input() product: Product | undefined;
  pricePromotion: number | undefined;
  discount: number | undefined;

  constructor(private cartSvc: CartService) {}

  get numAddedCart(): number | void {
    if (this.product) {
      return this.cartSvc.findProductInCart(this.product.id)?.productQty;
    }
    return undefined;
  }

  toSafeUrl = (url: string): string => {
    let safeUrl: string = url;
    if (!url.replace('https', '')) {
      safeUrl = safeUrl.replace('http', '');
      safeUrl = `https${safeUrl}`;
    }
    return safeUrl;
  };

  addToCart(product: Product) {
    const newItemCart: ItemCart = {
      productId: product.id,
      productName: product.title,
      productThumbnail: product.thumbnail,
      productPrice: this.pricePromotion ? this.pricePromotion : product.price,
      productQty: 1
    };
    this.cartSvc.addItem(newItemCart);
  }

  ngOnChanges(changes: SimpleChanges) {
    const product: Product = changes.product.currentValue;
    if (product) {
      const { prices } = product.prices;
      const amount = prices.find((price) => price.type === 'promotion')?.amount;
      if (amount) {
        this.pricePromotion = amount;
        this.discount = 1 - amount / product.price;
      }
    }
  }
}
