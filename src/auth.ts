import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import Discord from "next-auth/providers/discord";
import { authApi } from "./features/apis";
import { EAuthProvider, IUser } from "./features/apis/interfaces";
import { setCookies } from "./lib/serverActions/setCookies";
import { jwtDecode } from "jwt-decode";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Twitter({
      clientId: process.env.AUTH_TWITTER_CLIENT_ID,
      clientSecret: process.env.AUTH_TWITTER_SECRET,
    }),
    Discord({
      clientId: process.env.AUTH_DISCORD_CLIENT_ID,
      clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET,
    }),
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials;
          if (!email || !password) {
            return null;
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
            {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            }
          );
          const data = await res.json();

          if (data.status === "error") {
            throw new Error(data.message);
          }
          setCookies(data.data.user.accessToken);

          return data.data.user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ account, user, credentials, profile }) {
      console.log({ account, profile });

      // ***** GITHUB PROVIDER ****
      if (account?.provider === "github") {
        const data = await authApi.handleLoginSocialAccount({
          id: profile?.id?.toString() ?? "",
          avatar: String(profile?.avatar_url) ?? "",
          name: profile?.name ?? "",
          location: String(profile?.location) ?? "",
          provider: EAuthProvider.Github,
        });
        if (data.status !== "error") {
          // **** Custom data user to JWT callbacks
          user.id = data.user.id;
          user.accessToken = data.user.accessToken;
          user.refreshToken = data.user.refreshToken;
          setCookies(data.user.accessToken);
          return true;
        } else {
          return false;
        }
      }
      // ***** GOOGLE PROVIDER ****
      if (account?.provider === "google") {
        const data = await authApi.handleLoginSocialAccount({
          id: profile?.sub ?? "",
          avatar: String(profile?.picture) ?? "",
          name: profile?.name ?? "",
          email: profile?.email ?? undefined,
          location: (profile?.location as string) ?? undefined,
          provider: EAuthProvider.Google,
        });
        if (data?.status !== "error") {
          // **** Custom data user to JWT callbacks
          user.id = data.user.id;
          user.accessToken = data.user.accessToken;
          user.refreshToken = data.user.refreshToken;
          setCookies(data.user.accessToken);
          return true;
        } else {
          return false;
        }
      }

      // ***** DISCORD PROVIDER ****
      if (account?.provider === "discord") {
        const data = await authApi.handleLoginSocialAccount({
          id: profile?.id ?? "",
          avatar: String(profile?.image_url) ?? "",
          name: (profile?.global_name as string) ?? "",
          provider: EAuthProvider.Discord,
        });
        if (data?.status !== "error") {
          // **** Custom data user to JWT callbacks
          user.id = data.user.id;
          user.accessToken = data.user.accessToken;
          user.refreshToken = data.user.refreshToken;
          setCookies(data.user.accessToken);
          return true;
        } else {
          return false;
        }
      }

      // ***** TWITTER PROVIDER ****
      if (account?.provider === "twitter") {
        const profileTwitter = profile?.data as {
          username?: string;
          name?: string;
          id?: string;
          profile_image_url?: string;
        };
        const data = await authApi.handleLoginSocialAccount({
          id: profileTwitter.id ?? "",
          avatar: profileTwitter?.profile_image_url ?? "",
          name: profileTwitter?.name ?? "",
          provider: EAuthProvider.Twitter,
        });
        if (data?.status !== "error") {
          // **** Custom data user to JWT callbacks
          user.id = data.user.id;
          user.accessToken = data.user.accessToken;
          user.refreshToken = data.user.refreshToken;
          setCookies(data.user.accessToken);
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // **** Handle refresh token when access token expired
      if (token.accessToken) {
        const { exp } = jwtDecode(token.accessToken);
        if (exp) {
          const currentTime = new Date();
          currentTime.setDate(new Date().getDate() + 1);
          if (exp >= currentTime.getTime()) {
            const data = await authApi.refreshToken(token.refreshToken);
            return {
              ...token,
              ...user,
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            };
          }
          return { ...token, ...user };
        }
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      const _token = token as unknown as IUser;
      const data = await authApi.getUser(_token.accessToken);
      const { exp } = jwtDecode(token.accessToken);
      if (exp) {
        session.expires = new Date(exp * 1000) as any;
      }
      return {
        ...session,
        user: {
          ...session.user,
          ...data.user,
        },
      };
    },
  },
  session: { strategy: "jwt" },
});
