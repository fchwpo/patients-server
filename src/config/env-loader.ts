import * as dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';
const dotEnvOptions = {
  path: `.env.${env}`,
};
console.log(`Loading environment from ${env}`);
dotenv.config(dotEnvOptions);
