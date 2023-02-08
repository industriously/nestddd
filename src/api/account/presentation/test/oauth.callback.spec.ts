import { Usecase } from '@INTERFACE/account';
import { IProfile, ISession } from '@INTERFACE/common';
import { OauthCallback } from '../oauth.callback';

describe('OauthCallback', () => {
  const usecase: Usecase = {
    async signIn({ sub }) {
      return { id: sub };
    },
  };

  const controller = new OauthCallback(usecase);

  it('callbackFromGoogle', async () => {
    const session = {} as ISession;
    await controller.callbackFromGoogle({ sub: 'google' } as IProfile, session);
    expect(session).toEqual({ account: { id: 'google' } });
  });

  it('callbackFromGithub', async () => {
    const session = {} as ISession;
    await controller.callbackFromGithub({ sub: 'github' } as IProfile, session);
    expect(session).toEqual({ account: { id: 'github' } });
  });
});
