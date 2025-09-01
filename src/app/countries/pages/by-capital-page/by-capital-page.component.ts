import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public searchTerm: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.searchTerm = this.countriesService.cacheStore.byCapital.term;
  }

  public search(searchTerm: string): void {
    this.countriesService.search(searchTerm)
      .subscribe(countries => {
        this.countries = countries;
      })
  }
}
