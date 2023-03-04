import React from "react";

import ReactHtmlParser from "react-html-parser";

export default function PageDetailDescription({ data }) {
  return (
    <main>
      <h4 style={{fontSize: 28}}>About the place</h4>
      {ReactHtmlParser(data.description)}
      <div className="row" style={{ marginTop: 30 }}>
        {data.features.length === 0
          ? "Tidak Ada Feature"
          : data.features.map((feature, index) => {
              return (
                <div
                  key={`feature-${index}`}
                  className="col-3"
                  style={{ marginBottom: 20 }}
                >
                  <img
                    width="38"
                    className="d-block mb-2"
                    src={feature.imageUrl}
                    alt={feature.name}
                  />{" "}
                  <span>{feature.qty}</span>{" "}
                  <span style={{fontSize: 20}} className="text-dark fw-regular">
                    {feature.name}
                  </span>
                </div>
              );
            })}
      </div>
    </main>
  );
}