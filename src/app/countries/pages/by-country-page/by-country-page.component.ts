import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public searchTerm: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.searchTerm = this.countriesService.cacheStore.byCountry.term;
  }

  public searchByName(name: string): void {
    this.isLoading = true;
    this.countriesService.searchByName(name)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      })
  }
}
