import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@pageNotFound/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('@home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('@cart/cart.module').then((m) => m.CartModule)
  },
  {
    path: 'products',
    loadChildren: () => import('@products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
