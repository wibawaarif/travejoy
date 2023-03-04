import React, { Component } from "react";

import Breadcrumb from "elements/Breadcrumb";

export default class Example extends Component {
  render() {
    const breadcrumb = [{
      pageTitle: "Home", pageHref: "" ,
    }, {
      pageTitle: "House Details", pageHref: "" 
    }]
    return (
      <div className="container">
        <div style={{height: "100vh"}} className="row align-items-center justify-content-center">
          <div className="col-auto">
            <Breadcrumb data={breadcrumb} />
          </div>
        </div>
      </div>
    );
  }
}
