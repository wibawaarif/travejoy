import React, { Component } from 'react'
import Fade from "react-reveal/Fade";

import { connect } from 'react-redux';

import Header from 'parts/Header'
import Button from "elements/Button";
import Stepper from "elements/Stepper";
import Controller from 'elements/Stepper/Controller';
import Numbering from 'elements/Stepper/Numbering';
import Meta from 'elements/Stepper/Meta';
import MainContent from 'elements/Stepper/MainContent';


import BookingInformation from "parts/Checkout/BookingInformation";
import Payment from "parts/Checkout/Payment";
import Completed from "parts/Checkout/Completed";

import { submitBooking } from 'store/actions/checkout';

class CheckoutPage extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      proofPayment: "",
      bankOrigin: "",
      bankHolder: "",
      errorMsg: "",
    },
  };

  onChange = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value,
        errorMsg: event.target.errorMsg
      }, 
    });
  };

  componentDidMount() {
    window.scroll(0, 0);
    document.title = "Checkout | Travejoy";
  }

  _Submit = (nextStep) => {
    const { data } = this.state;
    const { checkout } = this.props;

    const payload = new FormData();
    payload.append("firstName", data.firstName);
    payload.append("lastName", data.lastName);
    payload.append("emailAddress", data.email);
    payload.append("phoneNumber", data.phone);
    payload.append("idItem", checkout._id);
    payload.append("duration", checkout.duration);
    payload.append("startDate", checkout.date.startDate);
    payload.append("endDate", checkout.date.endDate);
    payload.append("accountHolder", data.bankHolder);
    payload.append("bankOrigin", data.bankOrigin);
    payload.append("image", data.proofPayment[0]);
    this.props.submitBooking(payload).then(() => {
      nextStep();
    })
  };

  render() {
    const { data } = this.state;
    const { checkout, page} = this.props;

    if(!checkout) 
    return (
      <div className="container">
        <div
          className="row align-items-center justify-content-center text-center"
          style={{ height: "100vh" }}
        >
          <div className="col-3">
            Choose the place first!
            <div>
              <Button
                className="btn mt-5"
                type="button"
                onClick={() => this.props.history.goBack()}
                isLight
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )

    const steps = {
      bookingInformation: {
        title: "Booking Information",
        description: "Please fill up the blank fields below",
        content: (
          <BookingInformation
            data={data}
            checkout={checkout}
            ItemDetails={page[checkout._id]}
            onChange={this.onChange}
          />
        ),
        },
        payment: {
          title: "Payment",
          description: "Kindly follow the instructions below",
          content: (
            <Payment
              data={data}
              ItemDetails={page[checkout._id]}
              checkout={checkout}
              onChange={this.onChange}
            />
          ),
        },
        completed: {
          title: "Yay! Completed",
          description: null,
          content: <Completed />,
        },
      }


    return (
      <>
      <Header isCentered />
      <Stepper steps={steps}>
        {
          (prevStep, nextStep, CurrentStep, steps) => (
            <>
              <Numbering
                data={steps}
                current={CurrentStep}
                style={{ marginBottom: 50, marginTop: 50 }}
              />

              <Meta data={steps} current={CurrentStep} />

              <MainContent data={steps} current={CurrentStep} />

              {CurrentStep === "bookingInformation" && (
                <Controller>
                  {data.firstName !== "" &&
                    data.lastName !== "" &&
                    data.email.length > 1 &&
                    data.phone !== "" &&
                    !data.errorMsg && (
                      <Fade>
                        <Button
                          className="btn mb-3 col-12 py-3"
                          type="button"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={nextStep}
                        >
                          <span className="fs-5 fw-medium text-light button-checkout">Continue to Book</span>
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn col-12 py-3"
                    type="link"
                    isBlock
                    isLight
                    href={`/properties/${checkout._id}`}
                  >
                    <span className='fs-5 fw-medium button-checkout' style={{color: '#ACACAC'}}>Cancel</span>
                  </Button>
                </Controller>
              )}

              {CurrentStep === "payment" && (
                <Controller>
                  {data.proofPayment !== "" &&
                    data.bankName !== "" &&
                    data.bankHolder !== "" && (
                      <Fade>
                        <Button
                          className="btn mb-3 col-12 py-3"
                          type="button"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={() => this._Submit(nextStep)}
                        >
                          <span className="fs-5 fw-medium text-light button-checkout">Continue to Book</span>
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn col-12 py-3"
                    type="button"
                    isBlock
                    isLight
                    onClick={prevStep}
                  >
                    <span className='fs-5 fw-medium button-checkout' style={{color: '#ACACAC'}}>Cancel</span>
                  </Button>
                </Controller>
              )}

            {CurrentStep === "completed" && (
                <Controller>
                  <Button
                    className="btn col-12 py-3"
                    type="link"
                    isBlock
                    isPrimary
                    hasShadow
                    href=""
                  >
                    <span className="fs-5 fw-medium text-light button-checkout">Back to Home</span>
                  </Button>
                </Controller>
              )};
            </>
          )
        }
      </Stepper>
      </>
    );
  }


}

const mapStateToProps = (state) => ({
  checkout: state.checkout,
  page: state.page,
});


export default connect(mapStateToProps, { submitBooking })(CheckoutPage);
