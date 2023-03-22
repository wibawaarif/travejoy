import React from "react";
import Fade from "react-reveal/Fade";

import Breadcrumb from "elements/Breadcrumb";

export default function PageDetailTitle({ data, breadcrumb }) {
  return (
    <section style={{marginTop: 50}} className="container spacing-sm">
      <Fade bottom>
        <div className="row align-items-center">
          <div className="col">
            <Breadcrumb data={breadcrumb} />
          </div>
          <div className="col-auto text-center">
            <h1 className="fw-semibold" style={{fontSize: 36}}>{data.title}</h1>
            <span className="text-dark">
              {data.city}, {data.country}
            </span>
          </div>
          <div className="col"></div>
        </div>
      </Fade>
    </section>
  );
}