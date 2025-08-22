import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent {
  @Input()
  public placeholder: string = '';
  @ViewChild('searchInput')
  public searchInput!: ElementRef;
  @Output('onSearch')
  public eventEmitter: EventEmitter<string> = new EventEmitter();

  public search(): void {
    this.eventEmitter.emit(this.searchInput.nativeElement.value)
  }
}
