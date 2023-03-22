import { CHECKOUT_BOOKING } from "../types";
import axios from "axios";

export const checkoutBooking = (payload) => (dispatch) => {
  dispatch({
    type: CHECKOUT_BOOKING,
    payload: payload,
  });
};

export const submitBooking = (payload) => () => {
  return axios.post(`https://travejoyapps-3-n1195700.deta.app/api/v1/member/booking-page`, payload, {
    headers: { contentType: "multipart/form-data" },
  });
};