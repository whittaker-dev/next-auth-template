export const cookieKeys = {
  accessToken:
    process.env.NODE_ENV === "development"
      ? "__Dev-access-token"
      : "__Production-access-token",
};
