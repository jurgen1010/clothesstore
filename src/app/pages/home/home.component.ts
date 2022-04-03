import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ItemsByCategoryService } from '@appShared/services/items-by-category.service';
import { takeUntil } from 'rxjs/operators';
import SwAlert from 'sweetalert2';
import { Subject } from 'rxjs';
import { Product } from '@appShared/models/Products/product.model';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  productsMostWanted: Product[] = [];
  private destroy$ = new Subject<unknown>();

  constructor(private itemsByCategorySvc: ItemsByCategoryService, @Inject(DOCUMENT) private document: Document) {
    this.document.documentElement.scrollTop = 0;
  }

  ngOnInit(): void {
    this.itemsByCategorySvc
      .searchItemsInCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (itemsResponse) => {
          this.productsMostWanted = itemsResponse.results.filter((product) => product.listing_type_id === 'gold_pro');
        },
        () => {
          SwAlert.showValidationMessage(`Error obteniendo productos más buscados.`);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
