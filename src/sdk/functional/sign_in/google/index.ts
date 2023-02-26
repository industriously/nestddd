/**
 * @packageDocumentation
 * @module api.functional.sign_in.google
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";
import typia from "typia";

import type { IAuthUsecase } from "./../../../interface/user/auth.usecase.interface";

/**
 * 로그인 테스트용 api
 * 
 * @controller AuthController.test()
 * @path GET /sign-in/google
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function test
    (
        connection: IConnection
    ): Promise<test.Output>
{
    return Fetcher.fetch
    (
        connection,
        test.ENCRYPTED,
        test.METHOD,
        test.path()
    );
}
export namespace test
{
    export type Output = string;

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

/**
 * 로그인 API
 * 
 * 구글 oauth2 인증을 통해 얻은 code를 body를 통해 제공해야 합니다.
 * 
 * @tag authentication
 * 
 * @controller AuthController.callbackFromGoogle()
 * @path POST /sign-in/google
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function callbackFromGoogle
    (
        connection: IConnection
    ): Promise<callbackFromGoogle.Output>
{
    return Fetcher.fetch
    (
        connection,
        callbackFromGoogle.ENCRYPTED,
        callbackFromGoogle.METHOD,
        callbackFromGoogle.path()
    );
}
export namespace callbackFromGoogle
{
    export type Output = IAuthUsecase.SignInResponse;

    export const METHOD = "POST" as const;
    export const PATH: string = "/sign-in/google";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/sign-in/google`;
    }
    export const stringify = (input: Input) => typia.assertStringify(input);
}