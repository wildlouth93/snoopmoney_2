import React from 'react';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import { AuthRoute, ProtectedRoute} from '../utils/route_utils';
import MainContainer from './main/main_container';

const App = () => (
  <div>
    <Route path="/" component={NavBarContainer} />
    <Switch>
      <AuthRoute exact path="/signup" component={SignupContainer} />
      <AuthRoute exact path="/login" component={LoginContainer} />
      <Route exact path="/" component={MainContainer} />
      <Redirect to="/" />
    </Switch>
  </div>
);

// function NoMatch() {
//   let location = useLocation();

//   return (
//     <div>
//       <h3>
//         No match for <code>{location.pathname}</code>
//       </h3>
//     </div>
//   );
// }

export default App; 