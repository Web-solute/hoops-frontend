import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import routes from "./routes";
import { GlobalStyles } from "./styles";
import Header from "./Components/Header";
 
function App() {
  
  return (
    <div>
      <Router>
        <GlobalStyles />
        <Header />
        <Switch>   
            <Route path={routes.home} exact>
              <Login />
            </Route>
            <Route path={routes.signUp}>
              <Signup/>
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;