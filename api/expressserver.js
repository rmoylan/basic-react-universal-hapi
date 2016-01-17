import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import { routes } from './routes';

const app = express();

app.use(express.static('dist'));

app.set('view engine', 'ejs');

// let output = (
// 			`<!doctype html>
// 			<html lang="en-us">
// 				<head>
// 					<meta charset="utf-8">
// 					<title>Hapi Universal Redux</title>
// 					<link rel="shortcut icon" href="/favicon.ico">
// 				</head>
// 				<body>
// 					<div id="react-root">${reactString}</div>
// 					<div id="react-dev"></div>
//  				<script>
//  					window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
//  					window.__UA__ = ${JSON.stringify(request.headers['user-agent'])}
//  				</script>
//  				<script src=${webserver}/dist/client.js></script>
//  			</body>
// 			</html>`
//  		);

app.get('*', (req, res) => {
  // routes is our object of React routes defined above
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // if we got props, that means we found a valid component to render
      // for the given route
      const markup = renderToString(<RoutingContext {...props} />);

      // render `index.ejs`, but pass in the markup we want it to display
      res.render('index', { markup })

    } else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      res.sendStatus(404);
    }
  });
});
const server = http.createServer(app);

server.listen(3003);
server.on('listening', () => {
  console.log('Listening on 3003');
});
