import type { AutocompleteAPIFieldData } from './Metadata';

interface RorItem {
  name: string;
  id: string;
}

export interface RorResponse {
  number_of_results: number;
  items: RorItem[];
}

interface OrcidItem {
  'family-names': string;
  'given-names': string;
  'orcid-id': string;
}

export interface OrcidResponse {
  'num-found': number;
  'expanded-result': OrcidItem[];
}

interface GeonamesItem {
  name: string;
  fcodeName: string;
  countryName?: string;
  geonameId: string;
}

export interface GeonamesResponse {
  totalResultsCount: number;
  geonames: GeonamesItem[];
}

export interface QueryReturnType {
  data: AutocompleteAPIFieldData;
  isLoading: boolean;
  isFetching: boolean;
}