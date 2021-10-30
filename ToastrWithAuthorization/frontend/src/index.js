import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { authorizeUserSite } from './components/Register/Register';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from './redux/store';
import { LoadUsers } from './actions/LoadUsers';


const token = localStorage.getItem('token');
//store.dispatch(LoadUsers());
if(token) 
{
  console.log(token);
  store.dispatch(authorizeUserSite(token));
}

ReactDOM.render(
  <Provider store={store}>
      <ConnectedRouter history={history}>

    <App />
      </ConnectedRouter></Provider>,
  document.getElementById('root')
);
