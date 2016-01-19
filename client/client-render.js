import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import { routes } from '../api/routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';

var rootInstance = ReactDOM.render(
  <Router routes={routes} history={createBrowserHistory()} />,
  document.getElementById('app')
)
//
// // Then just copy and paste this part at the bottom of
// // the file
// if (module.hot) {
//   require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
//     getRootInstances: function () {
//       // Help React Hot Loader figure out the root component instances on the page:
//       return [rootInstance];
//     }
//   });
// }
