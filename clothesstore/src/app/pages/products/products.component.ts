import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ItemsByCategoryService } from '@appShared/services/items-by-category.service';
import { ProductSearchControlService } from '@appShared/services/product-search-control.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import SwAlert from 'sweetalert2';
import { Product } from '@appShared/models/Products/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() query: string = '';
  products: Product[] | undefined;
  primary_results: number = 0;
  private destroy$ = new Subject<unknown>();

  constructor(
    private itmesByCategorySvc: ItemsByCategoryService,
    private productSearchControlSvc: ProductSearchControlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productSearchControlSvc.paramsSearch$.subscribe((params) => {
      this.query = params.q || '';
      if (this.query === '') {
        this.products = [];
        this.router.navigate(['/']).then();
        return;
      }
      if (params.offset <= this.primary_results) {
        this.itmesByCategorySvc
          .searchItemsInCategory(params)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (itemsResponse) => {
              if (this.query === 'ofertas') {
                const productsInPromotion = itemsResponse.results.filter((product) =>
                  product.prices.prices.find((price) => price.type === 'promotion')
                );
                if (productsInPromotion) {
                  this.saveToLocalStorage(productsInPromotion);
                  this.primary_results = itemsResponse.paging.primary_results;
                }
                return;
              }
              if (itemsResponse.results) {
                this.saveToLocalStorage(itemsResponse.results);
                this.primary_results = itemsResponse.paging.primary_results;
              }
            },
            () => {
              SwAlert.showValidationMessage(`Error obteniendo productos más buscados.`);
            }
          );
      }
    });
  }

  saveToLocalStorage(products: Product[]): void {
    const productsInMemory: Product[] = JSON.parse(<string>localStorage.getItem('ProductsSearch'));
    if (productsInMemory) {
      localStorage.setItem('ProductsSearch', JSON.stringify([...productsInMemory, ...products]));
    } else {
      localStorage.setItem('ProductsSearch', JSON.stringify(products));
    }
    this.products = JSON.parse(<string>localStorage.getItem('ProductsSearch'));
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
    localStorage.removeItem('ProductsSearch');
  }
}
