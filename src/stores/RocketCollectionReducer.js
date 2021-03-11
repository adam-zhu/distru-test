import { ACTIONS } from '../actions/Rockets';

const initialState = {
  rockets: {},
};

const actionHandlers = {
  [ACTIONS.REQUEST_DETAIL]: ({ state, action }) => ({
    ...state,
    rockets: { ...state.rockets, [action.payload]: 'loading' },
  }),
  [ACTIONS.RECEIVE_DETAIL]: ({ state, action }) => ({
    ...state,
    rockets: {
      ...state.rockets,
      [action.payload.rocket_id]: action.payload,
    },
  }),
};

export default (state = initialState, action) =>
  actionHandlers[action.type]
    ? actionHandlers[action.type]({ state, action })
    : state;
