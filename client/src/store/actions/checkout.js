import { CHECKOUT_BOOKING } from "../types";
import axios from 'configs/axios/index'

export const checkoutBooking = (payload) => (dispatch) => {
  dispatch({
    type: CHECKOUT_BOOKING,
    payload: payload,
  });
};

export const submitBooking = (payload) => () => {
  return axios.post(`/booking-page`, payload, {
    headers: { contentType: "multipart/form-data" },
  });
};