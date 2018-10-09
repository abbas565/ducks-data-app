import axios from "axios";

import {
  ADD_REPORT,
  GET_ERRORS,
  //CLEAR_ERRORS,
  GET_REPORTS,
  GET_REPORT,
  REPORT_LOADING,
  DELETE_REPORT
} from "./types";

// Add Report
export const addReport = reportData => dispatch => {
  // dispatch(clearErrors());
  axios
    .post("/api/reports", reportData)
    .then(res =>
      dispatch({
        type: ADD_REPORT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Reports
export const getReports = () => dispatch => {
  dispatch(setReportLoading());
  axios
    .get("/api/reports")
    .then(res =>
      dispatch({
        type: GET_REPORTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REPORTS,
        payload: null
      })
    );
};

// Get Report
export const getReport = id => dispatch => {
  dispatch(setReportLoading());
  axios
    .get(`/api/reports/${id}`)
    .then(res =>
      dispatch({
        type: GET_REPORT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_REPORT,
        payload: null
      })
    );
};

// Delete REPORT
export const deleteReport = id => dispatch => {
  axios
    .delete(`/api/reports/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_REPORT,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set loading state
export const setReportLoading = () => {
  return {
    type: REPORT_LOADING
  };
};

// Clear errors
// export const clearErrors = () => {
//   return {
//     type: CLEAR_ERRORS
//   };
// };
