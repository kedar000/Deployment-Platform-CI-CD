import jwt, { JwtHeader } from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { promisify } from "util";
import { config } from "../config";
import {ApiError} from "@myorg/shared"
import { DecodedGoogleUser } from "../types/decodedGoogleUser.types";

const client = jwksClient({
  jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
});

// Promisify the callback-based method
const getSigningKeyAsync = promisify(client.getSigningKey.bind(client));

async function getSigningKey(kid: string) {
  const key = (await getSigningKeyAsync(kid)) as jwksClient.SigningKey;
  return key.getPublicKey();
}

export async function verifyGoogleIdToken(idToken: string):Promise<DecodedGoogleUser> {
  const decodedHeader = jwt.decode(idToken, { complete: true }) as { header: JwtHeader };
  if (!decodedHeader || !decodedHeader.header.kid) {
    throw new ApiError("Invalid ID token: missing header.kid");
  }

  const publicKey = await getSigningKey(decodedHeader.header.kid);

  const payload = jwt.verify(idToken, publicKey, {
    algorithms: ["RS256"],
    audience: config.googleOAuthClientId,
    issuer: ["https://accounts.google.com", "accounts.google.com"],
  }) as DecodedGoogleUser;

  return payload;
}
