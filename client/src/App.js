import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'assets/scss/style.scss'
import LandingPage from "pages/LandingPage";
import DetailsPage from "pages/DetailsPage";
import CheckoutPage from "pages/CheckoutPage";
import NotFound from "pages/404";

function App() {
  return (
    <div className="App bg-light">
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/properties/:id" component={DetailsPage}></Route>
          <Route exact path="/checkout" component={CheckoutPage}></Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>

      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
