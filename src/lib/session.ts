import "server-only";

import { getIronSession } from "iron-session";
import { jwtVerify, SignJWT } from "jose";
import { JWTExpired, JWTInvalid } from "jose/errors";
import { cookies } from "next/headers";

export type User = {
  sub: string;
  username: string;
};

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "12345678901234567890123456789012"
);
const ttl = 60 * 60 * 24 * 7; // 7 dias

export async function getSession() {
  const cookieStore = await cookies();
  return getIronSession<{ token: string }>(cookieStore, {
    password: process.env.SESSION_SECRET || "12345678901234567890123456789012",
    cookieName: "auth",
    ttl,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: (ttl === 0 ? 2147483647 : ttl) - 60,
      path: "/",
    },
  });
}

export async function createToken(user: User): Promise<string> {
  return await new SignJWT({
    sub: user.sub,
    username: user.username,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function saveSession(user: User) {
  const token = await createToken(user);
  const session = await getSession();
  session.token = token;
  await session.save();
}

export async function destroySession() {
  const session = await getSession();
  session.destroy();
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();
  if (!session.token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(session.token, secret);
    return {
      sub: payload.sub as string,
      username: payload.username as string,
    };
  } catch (error) {
    if (error instanceof JWTExpired) {
      console.log("Token expirado");
      await destroySession();
    } else if (error instanceof JWTInvalid) {
      console.log("Token inválido");
      await destroySession();
    }
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getUser();
  if (!user) {
    throw new Error("Usuário não autenticado");
  }
  return user;
}