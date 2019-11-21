import React from 'react';
import SignupContainer from './session/signup_container';
import LoginContainer from './session/login_container';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBarContainer from './nav_bar/nav_bar_container';
import { AuthRoute, ProtectedRoute} from '../utils/route_utils';
import MainContainer from './main/main_container';
import HoldingsIndexContainer from './holdings/holding_index_container';
import WatchListItemsIndexContainer from './watchlistitems/watchlistitem_index_container';
import StockShowContainer from './stocks/stock_show_container';
import AccountShowContainer from './account/account_show_container';

const App = () => (
  <div>
    <Route path="/" component={NavBarContainer} />
    <Switch>
      <ProtectedRoute path="/account" component={AccountShowContainer} />
      <ProtectedRoute path="/stocks/:symbol" component={StockShowContainer} />
      {/* <Route path="/watchlistitems" component={WatchListItemsIndexContainer} />
      <Route path="/holdings" component={HoldingsIndexContainer} /> */}
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