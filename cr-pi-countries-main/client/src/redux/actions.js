import axios from 'axios';
export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_COUNTRIES_BY_ID = "GET_COUNTRIES_BY_ID"
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME"
export const CREATE_ACTIVITY = "CREATE_ACTIVITY"
export const GET_ACTIVITIES = "GET_ACTIVITIES"

export const getAllCountries = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/countries');
        dispatch({
          type: GET_ALL_COUNTRIES,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };
  
export const getCountryById = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/countries/id?id=${id}`);
        dispatch({
          type: GET_COUNTRIES_BY_ID,
          payload: response.data,
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
  };
  
export const getCountriesByName = (name) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`http://localhost:3001/countries/name?name=${name}`);
        dispatch({
          type: GET_COUNTRIES_BY_NAME,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };
  
export const createActivities = (activityData) => {
    return async (dispatch) => {
      try {
        const response = await axios.post('http://localhost:3001/activities', activityData);
        dispatch({
          type: CREATE_ACTIVITY,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };
  
  
export const getActivities = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('http://localhost:3001/activities');
        dispatch({
          type: GET_ACTIVITIES,
          payload: response.data,
        });
      } catch (error) {
        console.error(error);
      }
    };
  };