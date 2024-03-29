import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch} from 'react-router-dom';
import './App.css';
import PrivateRoute from "./components/HOC/PrivateRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import { isUserLoggedIn, getInitialData } from "./actions";
import Products from "./containers/Products";
import Orders from "./containers/Orders";
import Category from "./containers/Category";
import NewPage from "./containers/NewPage";


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
    

  }, [auth.authenticate]);


  return (
    <div className="App">
  <Switch>
    <PrivateRoute path="/" exact component={Home} />
    <PrivateRoute path="/page" component={NewPage} />
    <PrivateRoute path="/category"  component={Category} />
    <PrivateRoute path="/products"  component={Products} />
    <PrivateRoute path="/orders"  component={Orders} />





    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Switch>
    </div>
  );
}

export default App;
