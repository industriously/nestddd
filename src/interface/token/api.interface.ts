export namespace TokenAPI {
  export interface Credentials {
    readonly access_token: string;
    readonly refresh_token: string;
    readonly id_token: string;
  }
  export interface AccessToken {
    readonly access_token: string;
  }
}
