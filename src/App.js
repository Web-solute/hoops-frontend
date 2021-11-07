import { useState } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import NotFound from "./Screens/NotFound";
import { GlobalStyles } from "./styles";
import Header from "./Components/Header";
 
function App() {
const [isLoggedIn,setIsLoggedIn] = useState(false);

  return (
    <div>
      <Router>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home setIsLoggedIn={setIsLoggedIn}/> : <Login setIsLoggedIn={setIsLoggedIn} />}
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;