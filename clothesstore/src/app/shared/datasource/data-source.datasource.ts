import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '@appShared/models/Products/product.model';
import { takeUntil } from 'rxjs/operators';

export class ProductsDataSource extends DataSource<Product | undefined> {
  productsChanges$: BehaviorSubject<Product[]>;
  products: Product[] = [];
  private productInMemory: Product[] = [];
  private destroy$: Subject<boolean> = new Subject();
  private pagesSize = 10;
  private lastOffsetPaged = 0;

  constructor(products: Product[]) {
    super();
    this.productsChanges$ = new BehaviorSubject(this.productInMemory);
    this.products = products;
    this.getDataProducts();
  }

  connect(collectionViewer: CollectionViewer) {
    collectionViewer.viewChange.pipe(takeUntil(this.destroy$)).subscribe((range) => {
      const currentPage = Math.floor(range.end / this.pagesSize);
      if (currentPage > this.lastOffsetPaged) {
        this.lastOffsetPaged = currentPage;
        this.getDataProducts();
      }
    });
    return this.productsChanges$;
  }

  getDataProducts() {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < this.pagesSize; i++) {
      this.productInMemory = [
        ...this.productInMemory
        // this.products[Math.floor(Math.random() * this.products.length) + 1]
      ];
    }
    this.productsChanges$.next(this.productInMemory);
  }

  disconnect() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
