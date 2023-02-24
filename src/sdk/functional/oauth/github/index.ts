/**
 * @packageDocumentation
 * @module api.functional.oauth.github
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

import type { IAuthUsecase } from "./../../../interface/user/auth.usecase.interface";

/**
 * @controller AuthController.callbackFromGithub()
 * @path GET /oauth/github
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function callbackFromGithub
    (
        connection: IConnection
    ): Promise<callbackFromGithub.Output>
{
    return Fetcher.fetch
    (
        connection,
        callbackFromGithub.ENCRYPTED,
        callbackFromGithub.METHOD,
        callbackFromGithub.path()
    );
}
export namespace callbackFromGithub
{
    export type Output = IAuthUsecase.SignInResponse;

    export const METHOD = "GET" as const;
    export const PATH: string = "/oauth/github";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/oauth/github`;
    }
}