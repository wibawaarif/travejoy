import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom'

import 'assets/scss/style.scss'
import LandingPage from "pages/LandingPage";
import DetailsPage from "pages/DetailsPage";

function App() {
  return (
    <div className="App bg-light">
      <Router>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/properties/:id" component={DetailsPage}></Route>
      </Router>
    </div>
  );
}

export default App;
