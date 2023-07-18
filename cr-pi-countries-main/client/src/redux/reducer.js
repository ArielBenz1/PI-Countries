import {GET_ALL_COUNTRIES,GET_COUNTRIES_BY_ID,GET_COUNTRIES_BY_NAME,CREATE_ACTIVITY,GET_ACTIVITIES} from './actions';

const initialState = {
    countries: [],
    countryDetail: {},
    filteredCountries: [],
    activities: [],
  };
  
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
          ...state,
          countries: action.payload,
      };
  
    case GET_COUNTRIES_BY_ID:
      return {
          ...state,
          countryDetail: action.payload,
      };
  
    case GET_COUNTRIES_BY_NAME:
      return {
          ...state,
          filteredCountries: action.payload,
      };
  
    case CREATE_ACTIVITY:
      return {
          ...state,
          activities: [...state.activities, action.payload]
      };
  
    case GET_ACTIVITIES:
      return {
          ...state,
          activities: action.payload,
      };
  
    default:
        return {...state};
    }
  };
  
  export default reducer;