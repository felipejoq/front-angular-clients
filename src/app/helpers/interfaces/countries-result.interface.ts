export interface Country {
  countries: CountryElement[];
  ok:        boolean;
  message:   string;
}

export interface CountryElement {
  id:   number;
  code: string;
  name: string;
}
