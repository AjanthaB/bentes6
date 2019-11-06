import express from 'express';
import bodyParser from 'body-parser';
import { Airgram, Auth, prompt, toObject } from 'airgram';

// routes
import userRoute from '../routes/user.route';

const initAirGram = () => {
  const airgram = new Airgram({
    apiId: 1184698,
    apiHash: 'd6503f3e6ffb2a84d59d519cef4d16cb',
    command: process.env.TDLIB_COMMAND,
    logVerbosityLevel: 2
  });

  airgram.use(new Auth({
    code: () => prompt(`Please enter the secret code:\n`),
    phoneNumber: () => prompt(`Please enter your phone number:\n`)
  }))
  
  void (async () => {
    const me = toObject(await airgram.api.getMe())
    console.log(`[Me] `, me)
  })
  
  // Getting all updates
  airgram.use((ctx: any, next: any) => {
    if ('update' in ctx) {
      console.log(`[all updates][${ctx._}]`, JSON.stringify(ctx.update))
    }
    return next()
  })
  
  // Getting new messages
  airgram.on('updateNewMessage', async ({ update } : any) => {
    const { message } = update
    console.log('[new message]', message)
  })
}

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

  initAirGram();

  return app;
}

export default init;