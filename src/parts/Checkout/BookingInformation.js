import React from 'react'

import Fade from 'react-reveal/Fade'

import InputText from 'elements/Form/InputText';

export default function BookingInformation(props) {
    const { data, ItemDetails, checkout } = props;

  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-5 border-right py-5" style={{ paddingRight: 80 }}>
            <Fade delay={300}>
              <div className="card bg-light">
                <figure className="img-wrapper" style={{ height: 270 }}>
                  <img
                    className="img-cover"
                    src={ItemDetails.imageUrls[0].url}
                    alt={ItemDetails.name}
                  />
                </figure>
                <div className="row align-items-center">
                  <div className="col">
                    <div className="meta-wrapper">
                      <h5>{ItemDetails.name}</h5>
                      <span className="text-dark">
                        {ItemDetails.city}, {ItemDetails.country}
                      </span>
                    </div>
                  </div>
                  <div className="col-auto">
                    <span style={{fontWeight: 500, fontSize: 20}} className='text-secondary'>
                      ${+checkout.duration * ItemDetails.price} USD
                      <span className="text-dark"> per </span>
                      {checkout.duration} {ItemDetails.unit}
                      {+checkout.duration > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <div className="col-5 py-5" style={{ paddingLeft: 80 }}>
            <Fade delay={600}>
              <label htmlFor="firstName">First Name</label>
              <InputText
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={props.onChange}
                placeholder="Enter your first name..."
              />

              <label htmlFor="lastName">Last Name</label>
              <InputText
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={props.onChange}
                placeholder="Enter your last name..."
              />

              <label htmlFor="email">Email Address</label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={props.onChange}
                placeholder="Enter your valid email address..."
              />

              <label htmlFor="phone">Phone Number</label>
              <InputText
                id="phone"
                name="phone"
                type="tel"
                value={data.phone}
                onChange={props.onChange}
                placeholder="Enter your valid phone number..."
              />
            </Fade>
          </div>
        </div>
      </div>
    </Fade>
  )
}
