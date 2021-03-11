import RocketService from '../services/RocketService';

export const ACTIONS = {
  REQUEST_DETAIL: 'REQUEST_DETAIL',
  RECEIVE_DETAIL: 'RECEIVE_DETAIL',
};

const requestDetail = (rocketId) => ({
  type: ACTIONS.REQUEST_DETAIL,
  payload: rocketId,
});

const receiveDetail = (response) => ({
  type: ACTIONS.RECEIVE_DETAIL,
  payload: response.data,
});

export const fetchRocket = (dispatch) => (rocketId) => {
  dispatch(requestDetail(rocketId));

  return RocketService.get(rocketId).then((response) =>
    dispatch(receiveDetail(response)),
  );
};
