export interface ApiList {
  count: number;
  next: string;
  previous: null;
  results: ApiResult[];
}

export interface ApiResult {
  name: string;
  url: string;
}

export interface List {
  count: number;
  next: string;
  previous: null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
  id: number;
}
