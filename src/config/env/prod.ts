const prodEnv = {
  env: 'prod',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080
};

export default prodEnv;
