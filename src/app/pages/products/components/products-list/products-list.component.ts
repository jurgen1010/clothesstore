import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { Product } from '@appShared/models/Products/product.model';
import { DOCUMENT } from '@angular/common';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsListComponent implements OnChanges, OnDestroy {
  @Input() products: (Product | undefined)[] | undefined;
  @Input() query: string = '';

  showButtonScrollingUp = false;
  offset = 0;
  private scrollHeight = 600;
  private destroy$ = new Subject<unknown>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private productSearchControlSvc: ProductSearchControlService
  ) {
    this.onScrollTop();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const yOffset = window.pageYOffset;
    const { scrollTop, scrollHeight, offsetHeight } = this.document.documentElement;
    this.showButtonScrollingUp = (yOffset || scrollTop) > this.scrollHeight;
    if (scrollTop + 1.5 * offsetHeight >= scrollHeight) {
      console.warn(this.offset);
      this.productSearchControlSvc.params = {
        q: this.query,
        limit: this.productSearchControlSvc.itemPorPage,
        offset: this.offset
      };
      this.offset += this.productSearchControlSvc.itemPorPage;
    }
  }

  onScrollTop() {
    this.document.documentElement.scrollTop = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    const query = changes.query?.currentValue;
    if (query) {
      this.offset = 0;
      this.onScrollTop();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
