import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore {
  byCountry: TermCountries;
  byCapital: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region: Region;
  countries: Country[];
}
