import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';

import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';
  public cacheStore: CacheStore = {
    byCountry: {
      term: '',
      countries: []
    },
    byCapital: {
      term: '',
      countries: []
    },
    byRegion: {
      region: '',
      countries: []
    }
  }

  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
  }

  public search(searchTerm: string): Observable<Country[]> {
    return this.getCountries(`${this.apiUrl}/capital/${searchTerm}`)
      .pipe(
        tap(countries => this.cacheStore.byCapital = { term: searchTerm, countries }),
        tap(() => this.saveLocalStorage())
      )
  }

  public searchByName(name: string): Observable<Country[]> {
    return this.getCountries(`${this.apiUrl}/name/${name}`)
      .pipe(
        tap(countries => this.cacheStore.byCountry = { term: name, countries }),
        tap(() => this.saveLocalStorage())
      )
  }

  public searchByRegion(region: Region): Observable<Country[]> {
    return this.getCountries(`${this.apiUrl}/region/${region}`)
      .pipe(
        tap(countries => this.cacheStore.byRegion = { region: region, countries }),
        tap(() => this.saveLocalStorage())
      )
  }

  private getCountries(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      )
  }

  public searchByAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient.get<Country[]>(`${this.apiUrl}/alpha/${code}`)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      )
  }

  private saveLocalStorage(): void {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!)
  }
}
