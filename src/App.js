import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import Reservation from "./Screens/Reservation";
import Mypage from "./Screens/Mypage";
import Manager from "./Screens/Manager";
import routes from "./routes";
import { GlobalStyles } from "./styles";
import Header from "./Components/Header";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInVar } from "./apollo";
 
function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  //makeVar와 useReactiveVar가 한 세트!
  //makeVar로 데이터를 공유할 변수를 만들고 useReactiveVar를 이용해 사용한다!

  //ApolloProvider로 전체를 Wrapping하고 prop으로 연결을 위해 만들어준 client 사용
  return (
    <ApolloProvider client={client}>
      <GlobalStyles />
      <Router>
        <Header />
        <Switch>   
            <Route path={routes.home} exact>
              {isLoggedIn ? <Home/> : <Login />}
            </Route>
            {!isLoggedIn && 
              <Route path={routes.signUp} component={Signup} />
            }
            {isLoggedIn &&
            <>
            <Route path={routes.reservation} component={Reservation} />
            <Route path={routes.myPage + "/:studentId"} component={Mypage} />
            <Route path={routes.manager} component={Manager} />
            </>
            }
            <Redirect to="/" />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;