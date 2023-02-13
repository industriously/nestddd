export namespace Service {
  type JwtPayload = { readonly exp: number; readonly iat: number };
  export interface AccessTokenPayload {}
  export interface IdTokenPayload {}

  export type VerifyTokenResponse = JwtPayload &
    (AccessTokenPayload | IdTokenPayload);
}

export interface Service {
  readonly getAccessToken: (payload: Service.AccessTokenPayload) => string;
  readonly getIdToken: (payload: Service.IdTokenPayload) => string;
  readonly verifyToken: (token: string) => Service.VerifyTokenResponse;
}
