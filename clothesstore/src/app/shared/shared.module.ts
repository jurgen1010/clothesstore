import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '@appShared/components/header/header.component';
import { SearchComponent } from '@appShared/components/search/search.component';
import { FooterComponent } from '@appShared/components/footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './components/navbar/navbar.component';

const componentsExport = [HeaderComponent, FooterComponent];
const modulesExport = [CommonModule, RouterModule];

@NgModule({
  declarations: [componentsExport, SearchComponent, NavbarComponent],
  imports: [modulesExport, ReactiveFormsModule, ToastrModule.forRoot()],
  exports: [modulesExport, componentsExport]
})
export class SharedModule {}
