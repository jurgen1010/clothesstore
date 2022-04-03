import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() sidebarMode: boolean = false;
  @Output() sidebarClose: EventEmitter<boolean> = new EventEmitter<boolean>(false);
  @Output() query: EventEmitter<String> = new EventEmitter<String>();

  globalListenFunc: { (): void; (): void };

  constructor(private renderer: Renderer2) {
    this.globalListenFunc = this.renderer.listen('document', 'keydown.escape', () => {
      this.sidebarClose.emit(true);
    });
  }

  onFilter(query: string) {
    this.sidebarClose.emit(true);
    this.query.emit(query);
  }
}
