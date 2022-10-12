'use strict'

/**
 * @author Ajantha Bandara
 * @description Implement all the express configurations here
 */

import express from './express';
import envConfig from './config';

/**
 * @desc - create an instance of exress and invoke the callback
 */
export const init = (cb: any) => {
  const app = express();
  if (cb) {
    cb(app);
  }
}

/**
 * @desc - start the express application and listen on http://localhost:5000
 */
const start = () => {
  // const _config = config(process.env);
  const _config = envConfig(process.env.NODE_ENV);
  init((app: any) => {
    app.listen(_config.port, (err: any) => {
      if (err) console.log(err);
      console.log(`🔥Application is running on ${_config.host} port: ${_config.port} 🔥`);
    })
  })
}

export default start;
