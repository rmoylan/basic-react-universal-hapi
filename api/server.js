import {Server} from 'hapi';
import h2o2 from 'h2o2';
import inert from 'inert';
import React from 'react';
import ReactDOM from 'react-dom/server';
import {RoutingContext, match} from 'react-router';
import createLocation from 'history/lib/createLocation';
import {routes} from './routes';
import url from 'url';

const hostname = process.env.HOSTNAME || 'localhost';
const server = new Server();

server.connection({host: hostname, port: process.env.PORT || 3000});

server.register(
	[
		h2o2,
		inert,
		// WebpackPlugin
	],
	(err) => {
	if (err) {
		throw err;
	}

	server.start(() => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
	});
});

/**
 * Attempt to serve static requests from the public folder.
 */
server.route({
	method:  "GET",
	path:    "/{params*}",
	handler: {
		file: (request) => "dist" + request.path
	}
});

/**
 * Catch dynamic requests here to fire-up React Router.
 */
server.ext("onPreResponse", (request, reply) => {
	if (typeof request.response.statusCode !== "undefined") {
    return reply.continue();
  }
  match({routes, location: request.path}, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      reply.redirect(redirectLocation.pathname + redirectLocation.search)
    }
    else if (error || !renderProps) {
      reply.continue();
    }
    else {

	    const reactString = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
			// const curServer = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080/';
			const curServer = '/';

			let output = (
				`<!doctype html>
				<html lang="en-us">
					<head>
						<meta charset="utf-8">
						<title>Hapi Universal React</title>
						<link rel="shortcut icon" href="/favicon.ico">
					</head>
					<body>
						<div id="app"><div>${reactString}</div></div>
	 				<script>

	 				</script>
	 				<script src=${curServer}build.js></script>
	 			</body>
				</html>`
	 		);
    	reply(output);
    }
  });
});
