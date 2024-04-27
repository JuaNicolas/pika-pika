export interface ApiList {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiResult[];
}

export interface ApiResult {
  name: string;
  url: string;
}

export interface List {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

export interface Result {
  name: string;
  url: string;
  id: number;
}
