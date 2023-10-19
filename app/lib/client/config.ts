export const ironOptions = {
  cookieName: 'appsession',
  password: process.env.COOKIE_PW!,

  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
