import React from 'react';

export default class SplashScreen extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="splash">
        <img src="images/splash.jpg" />
      </div>
    );
  }
};
