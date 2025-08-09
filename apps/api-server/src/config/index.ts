import dotenv from "dotenv";
import path from "path"
import {z} from "zod"
dotenv.config({path:path.resolve(__dirname,"../../.env")});

const envSchema = z.object({
    PORT : z
           .string()
           .default("4000")
           .transform(Number)
           .refine((val)=>!isNaN(val),{message:"PORT must be a number"}),
    BASE_URL : z.string()     
})
const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error("❌ Invalid env vars:",z.treeifyError(env.error));
  process.exit(1);
}

export const config = {
  port: env.data.PORT,
  baseUrl:env.data.BASE_URL
};
