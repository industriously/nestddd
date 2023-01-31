/**
 * @packageDocumentation
 * @module api.functional.token.access_token
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";
import typia from "typia";

import type { TokenAPI } from "./../../../../interface/token/api.interface";

/**
 * 사용자 인증 토큰 생성 API
 * 
 * * access_token - api 요청시 사용자 인증에 사용
 * 
 * @tag token
 * @returns 재발급된 사용자 토큰을 포함한 포함한 JSON 데이터
 * @throw 401 사용자 인증 실패
 * @throw 403 권한 없음
 * 
 * @controller TokenController.getAccessToken()
 * @path POST /token/access_token
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function getAccessToken
    (
        connection: IConnection
    ): Promise<getAccessToken.Output>
{
    return Fetcher.fetch
    (
        connection,
        getAccessToken.ENCRYPTED,
        getAccessToken.METHOD,
        getAccessToken.path()
    );
}
export namespace getAccessToken
{
    export type Output = TokenAPI.Tokens;

    export const METHOD = "POST" as const;
    export const PATH: string = "/token/access_token";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/token/access_token`;
    }
    export const stringify = (input: Input) => typia.assertStringify(input);
}