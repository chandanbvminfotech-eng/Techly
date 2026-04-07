import dotenv from "dotenv";

dotenv.config({ path: "../.env.development.local" });

console.log(process.env.PORT);
