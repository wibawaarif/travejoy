import React from 'react'

import Fade from 'react-reveal/Fade'

import InputText from 'elements/Form/InputText';

export default function BookingInformation(props) {
    const { data, ItemDetails, checkout } = props;
  return (
    <Fade>
      <div className="container" style={{ marginBottom: 30 }}>
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-lg-5 border-end border-secondary py-lg-5 card-booking-input" style={{ paddingRight: 80, borderRadius: 1 }}>
            <Fade delay={300}>
              <div className="card bg-light">
                <figure className="img-wrapper" style={{ height: 270 }}>
                  <img
                    className="img-cover"
                    src={`${process.env.REACT_APP_HOST}/${ItemDetails.imageId[0].imageUrl}`}
                    alt={ItemDetails.title}
                  />
                </figure>
                <div style={{marginTop: '1rem'}} className="row align-items-center">
                  <div className="col">
                    <div className="meta-wrapper m-0">
                      <h4 style={{fontWeight: 400, fontSize: 24}}>{ItemDetails.title}</h4>
                      <span style={{fontSize: 20}} className="text-dark fw-light">
                        {ItemDetails.city}, {ItemDetails.country}
                      </span>
                    </div>
                  </div>
                  <div className="col-6 col-lg-auto">
                    <span style={{fontWeight: 500, fontSize: 22}} className='text-secondary'>
                      ${+checkout.duration * ItemDetails.price} USD
                      <span style={{fontWeight: 300}} className="text-dark"> per </span>
                      {checkout.duration} {ItemDetails.unit}
                      {+checkout.duration > 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <div className="col-12 col-lg-5 py-lg-5 card-booking-input" style={{ paddingLeft: 80 }}>
            <Fade delay={600}>
              <label style={{fontSize: 22}} htmlFor="firstName">First Name</label>
              <InputText
                id="firstName"
                name="firstName"
                value={data.firstName}
                onChange={props.onChange}
                placeholder="Enter your first name..."
              />

              <label style={{fontSize: 22}} htmlFor="lastName">Last Name</label>
              <InputText
                id="lastName"
                name="lastName"
                value={data.lastName}
                onChange={props.onChange}
                placeholder="Enter your last name..."
              />

              <label style={{fontSize: 22}} htmlFor="email">Email Address</label>
              <InputText
                id="email"
                name="email"
                type="email"
                value={data.email}
                onChange={props.onChange}
                errorResponse="Please enter a valid email address"
                placeholder="Enter your valid email address..."
              />

              <label style={{fontSize: 22}} htmlFor="phone">Phone Number</label>
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
