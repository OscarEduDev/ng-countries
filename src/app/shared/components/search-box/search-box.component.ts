import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Input()
  public placeholder: string = '';
  @ViewChild('searchInput')
  public searchInput!: ElementRef;
  @Output('onSearch')
  public eventEmitter: EventEmitter<string> = new EventEmitter();
  public debouncer: Subject<string> = new Subject();
  @Output()
  public onDebouncer: EventEmitter<string> = new EventEmitter();
  public debouncerSuscription?: Subscription;
  @Input()
  public initialValue: string = '';
  // public search(): void {
  //   this.eventEmitter.emit(this.searchInput.nativeElement.value)
  // }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(1000)
      )
      .subscribe(value => {
        this.onDebouncer.emit(value)
      })
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  public search(searchTerm: string): void {
    this.debouncer.next(searchTerm)
  }
}
