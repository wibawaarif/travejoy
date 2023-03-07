import React, { Component } from 'react'
import Fade from "react-reveal/Fade";

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

export default class CheckoutPage extends Component {
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
    document.title = "Staycation | Checkout";
  }


  render() {
    const { data } = this.state;

    const checkout = {
      duration: 3
    }

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
                          Continue to Book
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
                    <span style={{color: '#ACACAC'}}>Cancel</span>
                  </Button>
                </Controller>
              )};

              {CurrentStep === "payment" && (
                <Controller>
                  {data.proofPayment !== "" &&
                    data.bankName !== "" &&
                    data.bankHolder !== "" && (
                      <Fade>
                        <Button
                          className="btn mb-3"
                          type="button"
                          isBlock
                          isPrimary
                          hasShadow
                          onClick={nextStep}
                        >
                          Continue to Book
                        </Button>
                      </Fade>
                    )}
                  <Button
                    className="btn"
                    type="button"
                    isBlock
                    isLight
                    onClick={prevStep}
                  >
                    Cancel
                  </Button>
                </Controller>
              )};

            {CurrentStep === "completed" && (
                <Controller>
                  <Button
                    className="btn"
                    type="link"
                    isBlock
                    isPrimary
                    hasShadow
                    href=""
                  >
                    Back to Home
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
