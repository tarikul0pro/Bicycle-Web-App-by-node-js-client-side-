
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Pages/Home.js';
import Login from './Pages/Login.js';
import Headers from './Pages/Headers.js';
import PageNotFound from './Pages/PageNotFound.js';
import Register from './Pages/Register.js';

import AuthProvider from './contexts/AuthProvider/AuthProvider.js';
import AllProducts from './Pages/AllProducts.js';
import PrivateRoute from './Pages/PrivetRoute/PrivetRoute.js';
import Purchase from './Pages/Purchase.js';
import Dashboard from './Pages/Dashboard/Dashboard.js';
import MyBooking from './Pages/MyBooking.js';
import Review from './Pages/Review.js';
import Footer from './Pages/Footer/Footer.js';
function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Headers />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>          
            <Route path="/product/:bicycleId">
              <Purchase></Purchase>
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            
            
            <PrivateRoute path="/allproducts">
            <AllProducts></AllProducts>
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            
            <Route path="/register">
              <Register></Register>
            </Route>
            
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>

      </AuthProvider>
    </div>
  );
}

export default App;
