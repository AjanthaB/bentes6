import express from 'express';
import bodyParser from 'body-parser';

// routes
import userRoute from '../routes/index';

const initAppConfigs = (app: any) => {
  // setup the body-parser configurations
  app.use(bodyParser.json({ limit: '5mb' }))
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

  // setup static resources
  // app.use('/static', app.static('public'));
}

const initServerRoutes = (app: any) => {
  userRoute(app);
}

const initErrorHandler = (app: any) => {
  // error handler, send stacktrace only during development
  app.use((err: any, req: any, res: any, next: any) => { // eslint-disable-line no-unused-vars
    console.log(err);
    const status = err.status ? err.status : 400;
    return res.status(status)
      .json({
        message: err.message,
        stack: err.stack
      });
  });
}

const init = (): any => {
  const app = express();
  
  initAppConfigs(app);
  initServerRoutes(app);
  initErrorHandler(app);

  return app;
}

export default init;