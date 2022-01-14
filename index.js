const express = require('express');
const bodyParser = require('body-parser');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const jsonParser = bodyParser.json();
const app = express();

const port = 3000;
app.use(jsonParser);

const routerApi = require('./routes');
routerApi(app);

//errors middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Server started', port);
});
