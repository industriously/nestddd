/**
 * @packageDocumentation
 * @module api.functional.sign_in.github
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection } from "@nestia/fetcher";

/**
 * @controller SignInController.signInGithub()
 * @path GET /sign-in/github
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export function signInGithub
    (
        connection: IConnection
    ): Promise<void>
{
    return Fetcher.fetch
    (
        connection,
        signInGithub.ENCRYPTED,
        signInGithub.METHOD,
        signInGithub.path()
    );
}
export namespace signInGithub
{

    export const METHOD = "GET" as const;
    export const PATH: string = "/sign-in/github";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export function path(): string
    {
        return `/sign-in/github`;
    }
}