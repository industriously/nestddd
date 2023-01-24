import session from 'express-session';

export const sessionConfig: session.SessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'REFRESH_TOKEN',
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 100,
  },
  rolling: true,
};
