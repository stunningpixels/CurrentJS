import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// CurrentJS - A way to tell stories

export class CurrentStory extends Component{

  constructor() {
    super();
    this.state = {
      scrollPos: null,
      scrollPage: null,
      scrollPageCoversion: null
    }
    this.currentScrollingFeatures = this.currentScrollingFeatures.bind(this)
    this.currentNonScrollingFeatures = this.currentNonScrollingFeatures.bind(this)
    this._handleScroll = this._handleScroll.bind(this)
  }

  _handleScroll(e) {
    let scrollPage = parseInt((e.target.scrollTop / window.innerHeight) * 100)
    this.setState({scrollPos: e.target.scrollTop, scrollPage: scrollPage})
    if(!this.state.scrollPageCoversion) {
      this.setState({scrollPageCoversion: e.target.scrollTop / ((e.target.scrollTop / window.innerHeight) * 100)})
    }
  }

  componentDidMount() {
      const list = ReactDOM.findDOMNode(this.refs.CurrentStory);
      list.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
      const list = ReactDOM.findDOMNode(this.refs.CurrentStory);
      list.removeEventListener('scroll', this._handleScroll);
  }

  render() {
    console.log(this.state.scrollPos, this.state.scrollPage)
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        <div ref="CurrentStory" style={{overflow: 'scroll', position: 'absolute', width: '100%', height: '100%'}}>
          <div style={{height: this.props.height, overflow: 'hidden'}}>
            {this.currentScrollingFeatures()}
          </div>
        </div>
        {this.currentNonScrollingFeatures()}
      </div>
    )
  }

  currentScrollingFeatures() {
    let features = [];
    for(let child of this.props.children) {
      if(child.props.scrolling && child.props.start - 100 <= this.state.scrollPage && child.props.end + 100 >= this.state.scrollPage) {
        features.push(React.cloneElement(child, {
          top: child.props.start * this.state.scrollPageCoversion,
          percentageComplete:  100 * (this.state.scrollPage - child.props.start) / (child.props.end - child.props.start)
        }))
      }
    }
    return features;
  }

  currentNonScrollingFeatures() {
    let features = [];
    for(let child of this.props.children) {
      if(!child.props.scrolling && child.props.start <= this.state.scrollPage && child.props.end >= this.state.scrollPage) {
        features.push(React.cloneElement(child, {
          percentageComplete:  100 * (this.state.scrollPage - child.props.start) / (child.props.end - child.props.start)
        }))
      }
    }
    return features;
  }

}

export class CurrentFeature extends Component {
  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', top: this.props.top + 'px'}}>
        {renderChildrenWithProps(this.props.children, this.props)}
      </div>
    )
  }
}

const renderChildrenWithProps = (children, props) => {
  if(!(children instanceof Array)) {
    children = [children]
  }
  let childrenOut = []
  children.map((child, index) => {
    childrenOut.push(React.cloneElement(child, {
      top: props.top,
      percentageComplete: props.percentageComplete,
      start: props.start,
      end: props.end
    }))
  })
  return childrenOut
}

class FadeBox extends Component {
  render() {
    let {percentageComplete} = this.props;
    let opacity = 1 - Math.abs(1 - 0.02 * percentageComplete);
    return (
      <div style={{opacity}}>{renderChildrenWithProps(this.props.children, this.props)}</div>
    )
  }
}

class SwiftText extends Component {
  render() {
    let {percentageComplete} = this.props
    let opacity, top = 0;
    if(percentageComplete < 25) {
      opacity = percentageComplete * 0.04;
      top = (100 - percentageComplete * 2) + '%';
    }else if(percentageComplete < 75) {
      opacity = 1
      top = '50%';
    }else {
      opacity = (100 - percentageComplete) * 0.04
      top = ((100 - percentageComplete) * 2) + '%';
    }
    let style = {
      outer: {opacity, top, position: 'absolute'},
      p: {width: '50%', boxSixing: 'border-box', padding: '20px'}
    }
    return (
      <div style={style.outer}>
        <div style={{transform: 'translatey(-50%)'}}>
          {renderChildrenWithProps(this.props.children, this.props)}
        </div>
      </div>
    )
  }
}

export const Current = {FadeBox,SwiftText}
