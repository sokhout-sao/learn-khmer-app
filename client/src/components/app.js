import React from 'react';

export default class App extends React.Components {
  constructor() {
    super();
  }

  render() {
    return this.props.children;
  }
};
