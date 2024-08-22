import { createContext, useReducer } from "react";
import {
  ACCOUNT_CREATION_SUCCES,
  ACCOUNT_CREATION_FAIL,
  ACCOUNT_DETAILS_SUCCESS,
  ACCOUNT_DETAILS_FAIL,
} from "./accountActionTypes";
import axios from "axios";
import { API_URL_ACCOUNT } from "../../utils/apiURL";

export const accountContext = createContext();

// Initital State
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  account: null,
  accounts: [],
  loading: false,
  error: null,
};

// Reducer
const accountReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    // Account Create
    case ACCOUNT_CREATION_SUCCES:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_CREATION_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    // Details
    case ACCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        account: payload,
        loading: false,
        error: null,
      };
    case ACCOUNT_DETAILS_FAIL:
      return {
        ...state,
        account: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

// Provider
export const AccountContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, INITIAL_STATE);
  // console.log(state);

  //   Get account details action
  const getAccountDetailsAction = async (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userAuth?.token}`,
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.get(`${API_URL_ACCOUNT}/${id}`, config);
      if (res?.data?.status === "Success") {
        // dispatch
        dispatch({
          type: ACCOUNT_DETAILS_SUCCESS,
          payload: res?.data,
        });
      }
    } catch (error) {
      dispatch({
        type: ACCOUNT_DETAILS_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  // Create account
  const createAccountAction = async (formData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${state?.userAuth?.token}`,
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_ACCOUNT}`, formData, config);
      // console.log(res);

      if (res?.data?.status === "Success") {
        // dispatch
        dispatch({
          type: ACCOUNT_CREATION_SUCCES,
          payload: res?.data,
        });
      }
      window.location.href = "/dashboard";
    } catch (error) {
      dispatch({
        type: ACCOUNT_CREATION_FAIL,
        payload: error?.data?.response?.message,
      });
    }
  };

  return (
    <accountContext.Provider
      value={{
        getAccountDetailsAction,
        account: state?.account,
        createAccountAction,
        error: state?.error,
      }}
    >
      {children}
    </accountContext.Provider>
  );
};
