import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import { CurrentStory, CurrentFeature, Current } from './Current.js'

const { FadeBox, SwiftText } = Current

const style = {
  p: {
    width: '50%',
    boxSixing: 'border-box',
    padding: '20px'
  }
}

class App extends Component {

  render() {
    return (
      <CurrentStory height="2000">
        <CurrentFeature start={0} end={200} stepped={false} scrolling={true}>
          <p>Test</p>
        </CurrentFeature>
        <CurrentFeature start={0} end={200} stepped={false} scrolling={false}>
          <SwiftText>
              <p style={style.p}>As long as there have been elections, there has been targeting. Informing a group of debt-ridden, hungry University students on the benefits of a triple lock pension is hardly going to win any votes. It’s fundamental: <b>Tell them what they want to hear</b>.</p>
          </SwiftText>
        </CurrentFeature>
        <CurrentFeature start={150} end={350} stepped={false} scrolling={false}>
          <SwiftText>
            <p style={style.p}>But more recently, technology has enabled a new paradigm; Tell those who aren’t going to vote for you, exactly what they <i>don’t</i> want to hear.</p>
          </SwiftText>
        </CurrentFeature>
      </CurrentStory>
    );
  }
}

export default App;
