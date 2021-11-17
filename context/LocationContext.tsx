import createDataContext from './createDataContext';
import {formatSpeed} from '../utils/conversion';
import haversine from 'haversine';

const locationReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'add_current_location':
      return {...state, currentLocation: action.payload};
    case 'start_recording':
      return {...state, recording: true};
    case 'stop_recording':
      return {...state, recording: false};
    case 'add_location':
      const {latitude, longitude} = action.payload;
      const record = haversine(
        state.prevLatLong,
        {latitude, longitude},
        {
          unit: 'mile',
          threshold: 0.1,
        },
      );
      if (!record) {
        const dist = haversine(
          state.prevLatLong,
          {latitude, longitude},
          {
            unit: 'mile',
          },
        );
        const distance = !isNaN(dist) ? dist + state.distance : state.distance;
        return {
          ...state,
          locations: [...state.locations, action.payload],
          prevLatLong: {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          },
          distance,
        };
      }
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case 'update_speed':
      const topSpeed = formatSpeed(action.payload.speed);
      const avgSpeed = formatSpeed(
        state.locations.reduce((total, next) => total + next.speed, 0) /
          state.locations.length,
      );
      if (topSpeed > state.topSpeed) {
        return {...state, topSpeed, avgSpeed};
      }
      return {...state, avgSpeed};
    default:
      return state;
  }
};

const startRecording = dispatch => () => {
  dispatch({type: 'start_recording'});
};
const stopRecording = dispatch => () => {
  dispatch({type: 'stop_recording'});
};
const addLocation = dispatch => location => {
  dispatch({type: 'add_current_location', payload: location});
  dispatch({type: 'add_location', payload: location});
  dispatch({type: 'update_speed', payload: location});
  // dispatch({ type: "update_avg_speed", payload: location });
};

export const {Context, Provider} = createDataContext(
  locationReducer,
  {startRecording, stopRecording, addLocation},
  {
    recording: false,
    locations: [],
    currentLocation: null,
    topSpeed: 0,
    avgSpeed: 0,
    distance: 0,
    prevLatLong: {},
  },
);
