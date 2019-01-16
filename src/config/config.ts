/**
 * @author Ajantha Bandara
 */

import Joi from 'joi';

import defaultEnv from './env/default';
import devEnv from './env/development';
import prodEnv from './env/prod';

const envSchema = Joi.object({
  env: Joi.string()
    .allow(['dev', 'development', 'default'])
    .default('default'),
  port: Joi.number()
    .default(8080),
  host: Joi.string()
    .default("127.0.0.1"),
}).unknown()
  .required();

const config = (env: any) => {
  let config;
  switch (env) {
    case 'dev':
    case 'development':
      config = devEnv;
      break;
    
    case 'prod':
    case 'production':
      config = prodEnv;
      break;
  
    default:
      config = defaultEnv;
      break;
  }

  const { error, value: envVars } = Joi.validate(Object.assign({}, config, { env: env }), envSchema);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  } else {
    return envVars;
  }
}

export default config;
