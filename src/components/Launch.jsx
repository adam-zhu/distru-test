import React from 'react';

const Launch = ({ launch, rocket, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        padding: '1px 1rem 1rem 1rem',
        borderRadius: '0.2rem',
        marginBottom: '1rem',
      }}
    >
      <h2> {launch.mission_name} </h2>
      <div> Flight Number: {launch.flight_number} </div>
      {rocket && <RocketDetail rocket={rocket} />}
    </div>
  );
};

const RocketDetail = ({ rocket }) => {
  const { rocket_id, cost_per_launch, description } = rocket;
  const costPerLaunch = Math.round(cost_per_launch / 10000) * 100;

  return (
    <div
      style={{
        border: '1px solid lightgray',
        padding: '1px 1rem',
        borderRadius: '0.2rem',
        marginTop: '1rem',
      }}
    >
      <h3>Rocket Info</h3>
      Rocket ID: {rocket_id}
      <br />
      Cost Per Launch: ${costPerLaunch}
      <p>{description}</p>
    </div>
  );
};

export default Launch;
