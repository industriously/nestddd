import { Domain } from '@INTERFACE/account';
import { Session } from 'express-session';

export type ISession = Session & {
  account?: Pick<Domain.State, 'id'>;
};
