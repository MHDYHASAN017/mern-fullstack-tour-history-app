import axios from "axios";
import { createContext, useReducer, useContext } from "react";

const MainCtx = createContext();

const initialState = {
  loading: false,
  message: "",
  isAuth: false,
  user: null,
  users: [],
  profile: null,
  token: null,
  places: [],
  place: null,
};

const mainReducer = (state, action) => {
  if (action.type === "setLoading") {
    return {
      ...state,
      loading: true,
    };
  } else if (action.type === "setMsg") {
    return {
      ...state,
      message: action.payload,
    };
  } else if (action.type === "loginUser") {
    return {
      ...state,
      isAuth: true,
      user: action.payload,
      token: action.payload.token,
      loading: false,
    };
  } else if (action.type === "currentUser") {
    return {
      ...state,
      isAuth: true,
      user: action.payload,
      loading: false,
    };
  } else if (action.type === "allUsers") {
    return {
      ...state,
      users: action.payload,
      loading: false,
    };
  } else if (action.type === "getAllPlaces") {
    return {
      ...state,
      places: action.payload,
      loading: false,
    };
  } else if (action.type === "clearMessage") {
    return {
      ...state,
      message: action.payload,
    };
  } else if (action.type === "logoutUser" || action.type === "error") {
    localStorage.removeItem("userInfo");
    return {
      ...state,
      loading: false,
      message: "",
      isAuth: false,
      user: null,
      users: [],
      profile: null,
      token: null,
      places: [],
      place: null,
    };
  }

  return state;
};

const MainCtxProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  const clearMessage = () => {
    dispatch({
      type: "clearMessage",
      payload: "",
    });
  };

  const registerUser = async (userData, navigate) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/register-user`,
        userData,
        config
      );
      console.log(data);
      dispatch({
        type: "setMsg",
        payload: data.message,
      });
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  const loginUser = async (userData, navigate) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/user/login-user`,
        userData,
        config
      );
      // console.log(data);

      localStorage.setItem("userInfo", JSON.stringify(data));
      // dispatch({
      //   type: "setMsg",
      //   payload: data.message,
      // });
      dispatch({
        type: "loginUser",
        payload: data,
      });
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  const loadCurrentUser = async () => {
    let token;

    if (localStorage.getItem("userInfo")) {
      let tokenFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
      token = tokenFromLocalStorage.token;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(`/api/user/current-user`, config);
      // console.log(data);

      // localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({
        type: "currentUser",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
      dispatch({
        type: "error",
      });
    }
  };

  const getAllUsers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      dispatch({
        type: "setLoading",
      });

      const { data } = await axios.get(`/api/user/all-users`, { config });
      // console.log(data);

      dispatch({
        type: "allUsers",
        payload: data.users,
      });
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
      dispatch({
        type: "error",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: "logoutUser",
      payload: "",
    });
  };

  const addPlace = async (place, navigate) => {
    let token;

    if (localStorage.getItem("userInfo")) {
      let tokenFromLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
      token = tokenFromLocalStorage.token;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(`/api/place/add-place`, place, config);
      console.log(data);

      // localStorage.setItem("userInfo", JSON.stringify(data));
      if (data) {
        dispatch({
          type: "setMsg",
          payload: data.msg,
        });
        navigate("/my_places", {
          replace: true,
        });
      }
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  const getAllPlaces = async (place, navigate) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      dispatch({
        type: "setLoading",
      });
      const { data } = await axios.get(`/api/place/all-places`, place, {
        config,
      });
      // console.log(data);

      // localStorage.setItem("userInfo", JSON.stringify(data));
      if (data) {
        dispatch({
          type: "getAllPlaces",
          payload: data.places,
        });
      }
    } catch (error) {
      dispatch({
        type: "setMsg",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <MainCtx.Provider
      value={{
        ...state,
        clearMessage,
        registerUser,
        loginUser,
        loadCurrentUser,
        logout,
        getAllUsers,
        addPlace,
        getAllPlaces,
      }}
    >
      {children}
    </MainCtx.Provider>
  );
};

export const useMainCtx = () => {
  return useContext(MainCtx);
};

export default MainCtxProvider;
