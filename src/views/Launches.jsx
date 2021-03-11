import React, { useEffect, useState } from 'react';
import ConnectedView from './ConnectedView';
import { fetchLaunchesIfNeeded } from '../actions/Launches';
import Launch from '../components/Launch';
import { fetchRocket } from '../actions/Rockets';

const LaunchesView = (props) => {
  const { dispatch, ...reduxState } = props;
  const { launchCollection, rocketCollection } = reduxState;

  useEffect(() => {
    fetchLaunchesIfNeeded({ dispatch, launchCollection });
  }, []);

  return (
    <div>
      <h2> SpaceX launches </h2>
      <LaunchesContent
        launchCollection={launchCollection}
        rocketCollection={rocketCollection}
        rocketFetcher={(rocketId) => fetchRocket(dispatch)(rocketId)}
      />
    </div>
  );
};

const LaunchesContent = ({
  launchCollection,
  rocketCollection,
  rocketFetcher,
}) => {
  const [expandedFlightNumber, setExpandedFlightNumber] = useState();
  const isLoading = !launchCollection || launchCollection.fetching;
  const isEmpty = !isLoading && !launchCollection.launches.length;
  const onLaunchClick = (launch) => (e) => {
    if (expandedFlightNumber === launch.flight_number) {
      return setExpandedFlightNumber(undefined);
    }

    if (!rocketCollection.rockets[launch.rocket.rocket_id]) {
      rocketFetcher(launch.rocket.rocket_id);
    }

    return setExpandedFlightNumber(launch.flight_number);
  };

  if (isLoading) {
    return <div> LOADING </div>;
  }

  if (isEmpty) {
    return <div> NO DATA </div>;
  }

  return launchCollection.launches.map((launch) => (
    <Launch
      key={launch.flight_number}
      launch={launch}
      rocket={
        expandedFlightNumber && expandedFlightNumber === launch.flight_number
          ? rocketCollection.rockets[launch.rocket.rocket_id]
          : undefined
      }
      onClick={onLaunchClick(launch)}
    />
  ));
};

export default ConnectedView(LaunchesView, 'launches');
