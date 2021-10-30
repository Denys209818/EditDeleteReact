import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Switch, Route } from 'react-router-dom';
import { AuthorizeUser } from './actions/authorizeUser';
import Edit from './components/Edit/Edit';
import Main from './components/Main/Main';
import Navbar from './components/Navbar';
import Register from './components/Register/Register';
import ToastCustom from './components/Toast/Toast';


const App = () => {

  return (<>

        <Navbar/>
          <ToastCustom/>
        <Switch>
          <Route exact path="/">
              <Main/>
          </Route>
          <Route exact path="/register">
              <Register/>
          </Route>
          <Route exact path="/edit">
              <Edit/>
          </Route>
        </Switch>
      </>
  );
}

export default App;
