export const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  path: "/",
};

export const accessTokenCookieOptions = {
  ...cookieOptions,
  maxAge: 15 * 60 * 1000,
};
export const refreshTokenCookieOptions = {
  ...cookieOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
