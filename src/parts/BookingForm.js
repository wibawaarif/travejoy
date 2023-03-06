import React, { Component } from 'react'

import InputNumber from 'elements/Form/InputNumber/index'
import InputDate from 'elements/Form/InputDate/index'
import Button from 'elements/Button'

import propTypes from 'prop-types'

export default class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: {
            duration: 1,
            date: {
              startDate: new Date(),
              endDate: new Date(),
              key: "selection",
            },
          },
        };
      }

      updateData = (e) => {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            [e.target.name]: e.target.value,
          },
        });
      };

      componentDidUpdate(prevProps, prevState) {
        const { data } = this.state
        if (prevState.data.date !== data.date) {
            const startDate = new Date(data.date.startDate);
            const endDate = new Date(data.date.endDate);
            const countDuration = new Date(endDate - startDate).getDate();
            this.setState({
              data: {
                ...this.state.data,
                duration: countDuration,
              },
            });
        }

        if (prevState.data.duration !== data.duration) {
            const startDate = new Date(data.date.startDate);
            const endDate = new Date(
              startDate.setDate(startDate.getDate() + +data.duration - 1)
            );
            this.setState({
              ...this.state,
              data: {
                ...this.state.data,
                date: {
                  ...this.state.data.date,
                  endDate: endDate,
                },
              },
            });
          }
        }

        startBooking = () => {
          const { data } = this.state;
          this.props.startBooking({
            _id: this.props.itemDetails._id,
            duration: data.duration,
            date: {
              startDate: data.date.startDate,
              endDate: data.date.endDate,
            },
          });
          this.props.history.push("/checkout");
        };

  render() {
    const { data } = this.state
    const { itemDetails } = this.props
    return (
      <div className='card bordered bg-light' style={{padding: '60px 80px'}}>
                <h4 className="mb-3">Start Booking</h4>
        <h5 className="h2 text-green mb-4">
          ${itemDetails.price}{" "}
          <span style={{fontWeight: 200, fontSize: 36}} className="text-dark font-weight-light">
            per {itemDetails.unit}
          </span>
          </h5>
  

        <label style={{fontSize: 22}} htmlFor="duration">How long you will stay?</label>
        <InputNumber
          max={30}
          suffix={" night"}
          isSuffixPlural
          onChange={this.updateData}
          name="duration"
          value={data.duration}
        />

<label style={{fontSize: 22}} htmlFor="date">Choose a Date</label>
        <InputDate onChange={this.updateData} name="date" value={data.date} />

        <h6
          className="text-dark fw-light"
          style={{ marginBottom: 40, fontSize: 22 }}
        >
          You will pay{" "}
          <span className="text-secondary fw-medium">
            ${itemDetails.price * data.duration} USD
          </span>{" "}
          per{" "}
          <span className="text-secondary fw-medium">
            {data.duration} {itemDetails.unit}
          </span>
        </h6>

        <Button
          className="btn py-4 px-5"
          hasShadow
          isPrimary
          isBlock
          onClick={this.startBooking}
        >
          <span className="fs-5 fw-medium text-light">Continue to Book</span>
        </Button>

      </div>
    )
  }
}


BookingForm.propTypes = {
    itemDetails: propTypes.object,
    startBooking: propTypes.func,
}
