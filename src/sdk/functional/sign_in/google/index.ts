/**
 * @packageDocumentation
 * @module api.functional.sign_in.google
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

/**
 * 구글 oauth 인증 API
 * 
 * 인증 성공시 로그인 세션을 생성하고 메인 페이지로 이동합니다.
 * 
 * 인증 실패시 로그인 실패 페이지로 이동합니다.
 * 
 * @tag authentication
 * 
 * @controller SignInController.signInByGoogle()
 * @path GET /sign-in/google
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function signInByGoogle
    (
        connection: IConnection
    ): Promise<void>
{
    return Fetcher.fetch
    (
        connection,
        signInByGoogle.ENCRYPTED,
        signInByGoogle.METHOD,
        signInByGoogle.path()
    );
}
export namespace signInByGoogle
{

    export const METHOD = "GET" as const;
    export const PATH: string = "/sign-in/google";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/sign-in/google`;
    }
}