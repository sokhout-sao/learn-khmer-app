

import React from 'react';

export default class HomePage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="home-page">
        <h2>Bonjour et bienvenue sur le site des tests du cours de khmer de première année.</h2>
        <div>Vous trouverez ci-dessous les différents tests. test</div>
        <div class="buttons">
          <button onclick="document.location='./consonnesTest1'">Test son &lt;-&gt; consonne</button>
          <button onclick="document.location='./consonnesTest2'">Test consonne &lt;-&gt; son</button>
        </div>
      </div>
    );
  }
};
