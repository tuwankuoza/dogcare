import { SET_DATA, SET_SUBDATA, SET_IMAGE_DATA, SET_LOADING, SET_ERROR } from "./keys";

const initialState = {
  isLoading: false,
  data: [],
  subData: [],
  imageData: [],
  error: {},
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, isLoading: payload };
    case SET_DATA:
      return { ...state, data: payload };
    case SET_SUBDATA:
      return { ...state, subData: payload };
    case SET_IMAGE_DATA:
      return { ...state, imageData: payload };
    case SET_ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
}
