import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from '@appShared/services/loader.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked {
  title = 'clothesstore-latam';

  constructor(
    private spinner: NgxSpinnerService,
    public loaderSvc: LoaderService,
    private changeDetRef: ChangeDetectorRef
  ) {}

  ngAfterContentChecked() {
    this.changeDetRef.detectChanges();
    this.spinner
      .show(undefined, {
        type: 'ball-triangle-path',
        size: 'default'
      })
      .then();
  }
}
