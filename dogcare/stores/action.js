import { SET_DATA, SET_SUBDATA, SET_IMAGE_DATA, SET_LOADING, SET_ERROR } from "./keys";
import axios from 'axios'

export function setLoading(payload) {
  return {
      type: SET_LOADING,
      payload: payload,
  }
}

export function setError(payload) {
  return {
      type: SET_ERROR,
      payload: payload,
  }
}

export function setData(payload) {
  return {
      type: SET_DATA,
      payload: payload,
  }
}

export function setSubData(payload) {
  return {
      type: SET_SUBDATA,
      payload: payload,
  }
}

export function setImageData(payload) {
  return {
      type: SET_IMAGE_DATA,
      payload: payload,
  }
}

export function fetchDataAsync() {
  return async function(dispatch) {
    dispatch(setLoading(true))
    try {
      const { data } = await axios({
        method: 'GET',
        url: 'https://dog.ceo/api/breeds/list/all'
      })
      dispatch(setData(Object.keys(data.message)))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setError(error))
    } finally {
      dispatch(setLoading(false))
    }
  }
}

export function fetchSubDataAsync(payload) {
  return async function(dispatch) {
    dispatch(setLoading(true))
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://dog.ceo/api/breed/${payload}/list`
      })
      dispatch(setSubData(data.message))
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setError(error))
    } finally {
      dispatch(setLoading(false))
    }
    
  }
}

export function fetchImageAsync(payload) {
  return async function(dispatch) {
    dispatch(setLoading(true))
    try {
      const { data } = await axios({
        method: 'GET',
        url: `https://dog.ceo/api/breed/${payload}/images`
      })
      dispatch(setImageData(data.message))
    } catch (error) {
      dispatch(setError(error))
    } finally {
      dispatch(setLoading(false))
    }
  }
}