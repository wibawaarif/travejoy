import Button from "elements/Button";
import React from "react";

export default function Categories({ data }) {
  return data.map((category, index1) => {
    return (
      <section className="container pe-4 ps-4" key={`category-${index1}`}>
        <h3 className="mb-3 fw-medium">{category.name}</h3>
        <div className="container-grid">
          {category.items.length === 0 ? (
            <div className="row">
              <div className="col-auto align-items-center">
                There is no property at this category
              </div>
            </div>
          ) : (
            category.items.map((item, index2) => {
              return (
                <div
                  className="item column-3 row-1"
                  key={`category-${index1}-${index2}`}
                >
                  <div className="card bg-light">
                    {item.isPopular && (
                      <div className="tag">
                        Popular <span className="fw-light">Choice</span>
                      </div>
                    )}
                    <figure className="img-wrapper" style={{ height: 180 }}>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="img-cover"
                      />
                    </figure>
                    <div className="meta-wrapper">
                      <Button
                        type="link"
                        href={`/properties/${item._id}`}
                        className="stretched-link d-block text-grey-800 text-decoration-none"
                      >
                        <h5 className="text-secondary" style={{fontSize: 24, fontWeight: 400}}>{item.name}</h5>
                      </Button>
                      <span className="text-dark fw-light fs-5">
                        {item.city}, {item.country}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    );
  });
}
