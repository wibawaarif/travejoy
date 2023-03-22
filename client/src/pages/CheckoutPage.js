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

import ItemDetails from "json/itemDetails.json";

class CheckoutPage extends Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      proofPayment: "",
      bankName: "",
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


  render() {
    const { data } = this.state;
    const { checkout } = this.props;

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
            ItemDetails={ItemDetails}
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
              ItemDetails={ItemDetails}
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
                style={{ marginBottom: 50 }}
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
                          <span className="fs-5 fw-medium text-light">Continue to Book</span>
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn col-12 py-3"
                    type="link"
                    isBlock
                    isLight
                    href={`/properties/${ItemDetails._id}`}
                  >
                    <span className='fs-5 fw-medium' style={{color: '#ACACAC'}}>Cancel</span>
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
                          onClick={nextStep}
                        >
                          <span className="fs-5 fw-medium text-light">Continue to Book</span>
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
                    <span className='fs-5 fw-medium' style={{color: '#ACACAC'}}>Cancel</span>
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
                    <span className="fs-5 fw-medium text-light">Back to Home</span>
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
  checkout: state.checkout
});


export default connect(mapStateToProps)(CheckoutPage);
