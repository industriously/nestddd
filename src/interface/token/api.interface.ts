export namespace API {
  export interface AccessToken {
    readonly access_token: string;
  }
  export interface Tokens extends AccessToken {
    readonly id_token: string;
  }
}
