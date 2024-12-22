"use server"
import { SignJWT, jwtVerify } from "jose";
import { v4 as uuidv4 } from "uuid";

const secretKey = process.env.ACCESS_TOKEN_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type AccessTokenPayload = {
  userId:string;
  email:string;
}
type JWTPayloaded = {
  userId: string;
  email: string;
  expiresAt: Date;
}; 

export async function generateUserTokens(payload:AccessTokenPayload){
  const expiresAt = generateAccessTokenExpire();
  const accessToken = await encrypt({ ...payload, expiresAt });
  const refreshToken = uuidv4();
  const refreshTokenExpire = generateRefreshTokenExpire();

  return {
    accessToken,
    refreshToken,
    refreshTokenExpire
  };
}

export async function encrypt(payload: JWTPayloaded, options?: { expireTime:number | string | Date } ) {
  const _expireTime = options?.expireTime ? options.expireTime : '7d';
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(_expireTime)
    .sign(encodedKey);
}

export async function decrypt(accessToken: string) {
  try {
    const { payload } = await jwtVerify(accessToken, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("User Token Decrypt Fail",error);
    return null;
  }
}

function generateAccessTokenExpire():Date{
  //Expire time of Access Token is 2 hours
  return new Date(Date.now() + 2 * 60 * 60 * 1000);
}
function generateRefreshTokenExpire():Date{
  //Expire time of Refresh Token is 7 days
  return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
}