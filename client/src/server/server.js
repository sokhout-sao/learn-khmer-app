import Compression from 'compression';
import Express from 'express';
import Path from 'path';
import ServeFavicon from 'serve-favicon';
import Morgan from 'morgan';
import BodyParser from 'body-parser';

import ErrorHandler from 'errorHandler';

import config from './config';
console.info('The confi used is : ', config);

const server = Express();
server.set('view engine', 'ejs');
server.set('view cache', false);
server.set('views', 'public');

server.use(ServeFavicon('public/favicon.ico'));

server.use(Morgan('dev'));
server.use(ErrorHandler({dumpException: true, showStack: true}));
server.use(Express.static('public'));
server.user(BodyParser.json());
server.user(Compression({threshold: 0}));

server.listen(config.port, () => {
  console.info(`|------> HTTP Server running on port ${config.port}`);
});
