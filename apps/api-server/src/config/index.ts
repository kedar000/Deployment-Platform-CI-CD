import dotenv from "dotenv";
import path from "path"
import {z} from "zod"
import en from "zod/v4/locales/en.cjs";
dotenv.config({path:path.resolve(__dirname,"../../.env")});

const envSchema = z.object({
    PORT : z
           .string()
           .default("4000")
           .transform(Number)
           .refine((val)=>!isNaN(val),{message:"PORT must be a number"}),

    BASE_URL : z.string()  ,
    REDIRECT_URL : z.string(),
    GITHUB_OAUTH_CLIENT_ID : z.string(),
    GITHUB_OAUTH_CLIENT_SECRET : z.string(),
    GITHUB_SCOPES : z.string(),
    GOOGLE_REDIRECT_URL:z.url("Invalid google redirect url"),
    GOOGLE_OAUTH_CLIENT_ID:z.string(),
    GOOGLE_OAUTH_CLIENT_SECRET:z.string()
})
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid env vars:",z.treeifyError(env.error));
  process.exit(1);
}

export const config = {
  port: env.data.PORT,
  baseUrl:env.data.BASE_URL,
  githubRedirectURL:env.data.REDIRECT_URL,
  githubClientId:env.data.GITHUB_OAUTH_CLIENT_ID,
  githubClientSecret:env.data.GITHUB_OAUTH_CLIENT_SECRET,
  githubScopes:env.data.GITHUB_SCOPES,
  googleRedirectUrl:env.data.GOOGLE_REDIRECT_URL,
  googleOAuthClientId:env.data.GOOGLE_OAUTH_CLIENT_ID,
  googleOAuthClientSecret:env.data.GOOGLE_OAUTH_CLIENT_SECRET
};
