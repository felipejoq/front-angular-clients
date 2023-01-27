export interface Authentication {
  access_token:  string;
  token_type:    string;
  refresh_token: string;
  expires_in:    number;
  scope:         string;
  id:            number;
  email:         string;
  username:         string;
  jti:           string;
}

export interface Payload {
  user_name:   string;
  scope:       string[];
  id:          number;
  exp:         number;
  authorities: string[];
  jti:         string;
  email:       string;
  client_id:   string;
}

