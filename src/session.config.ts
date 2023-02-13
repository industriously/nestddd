import { SESSION_KEY } from '@COMMON/constants';
import session from 'express-session';

export const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: SESSION_KEY,
  cookie: {
    maxAge: 1000 * 100,
  },
  rolling: true,
};
