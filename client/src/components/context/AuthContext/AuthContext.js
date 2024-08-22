import { createContext, useReducer } from "react";
import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from "./authActionTypes";
import { API_URL_USER } from "../../utils/apiURL";
// auth context
export const authContext = createContext();
// Initial state
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  error: null,
  loading: false,
  profile: null,
};

// Auth reducer
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (action.type) {
    // Register
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };
    // Login
    case LOGIN_SUCCESS:
      // Add user to the localstorage
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
        userAuth: null,
      };

    // Profile
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };

    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    // Logut user
    case LOGOUT:
      // remove the user from localstorage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
    default: {
      return state;
    }
  }
};
// provider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  // console.log(state);

  // login action
  const loginUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      if (res?.data?.status === "Success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
      // Redirect
      window.location.href = "/dashboard";
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };
  // register action
  const registerUserAction = async (formData) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_USER}/register`,
        formData,
        config
      );
      if (res?.data?.status === "Success") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      // Redirect
      window.location.href = "/login";
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // profile action
  const fetchProfileAction = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`,
        },
      };
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      console.log(res);

      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  // Logout action
  const logOutUserAction = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    window.location.href = "/login";
  };

  return (
    <authContext.Provider
      value={{
        loginUserAction,
        userAuth: state,
        token: state?.userAuth?.token,
        fetchProfileAction,
        profile: state?.profile,
        error: state?.error,
        logOutUserAction,
        registerUserAction,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
