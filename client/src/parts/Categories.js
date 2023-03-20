import Button from "elements/Button";
import React from "react";
import Fade from 'react-reveal/Fade'

export default function Categories({ data }) {
  return data.map((category, index1) => {
    if(category.itemId.length === 0) return null
    return (
      <section className="container pe-4 ps-4" key={`category-${index1}`}>
        <Fade bottom>
        <h3 className="mb-3 fw-medium">{category.name}</h3>
        <div className="container-grid">
          {
            category.itemId.map((item, index2) => {
              return (
                <div
                  className="item column-3 row-1"
                  key={`category-${index1}-${index2}`}
                >
                  <Fade bottom delay={300 * index2}>
                  <div className="card bg-light">
                    {item.isPopular && (
                      <div className="tag">
                        Popular <span className="fw-light">Choice</span>
                      </div>
                    )}
                    <figure className="img-wrapper" style={{ height: 180 }}>
                      <img
                        src={item.imageId[0] ? `${process.env.REACT_APP_HOST}/${item.imageId[0].imageUrl}` : ""}
                        alt={item.title}
                        className="img-cover"
                      />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        href={`/properties/${item._id}`}
                        className="stretched-link d-block text-grey-800 text-decoration-none"
                      >
                        <h5 className="text-secondary" style={{fontSize: 24, fontWeight: 400}}>{item.title}</h5>
                      </Button>
                      <span className="text-dark fw-light fs-5">
                        {item.city}, {item.country}
                      </span>
                    </div>
                  </div>
                  </Fade>
                </div>
              );
            })
          }
        </div>
        </Fade>
      </section>
    );
  });
}
