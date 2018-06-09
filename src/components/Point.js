import React from 'react';

export default class Point extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      clickable: true
    };
    this.togglePoint = this.togglePoint.bind(this)
  }



  togglePoint(){
    this.setState( prevState => ({
      selected: !prevState.selected
    }))
  }

  render() {
    return (
      <span
        style={{position: 'absolute',
          top: this.props.y,
          left:this.props.x,
          height: 15,
          width:15,
          borderRadius: '50%',
        }}
      //   style={`
      // position: absolute;
      // top:${this.props.y};
      // left:${this.props.x};
      // height: 5px;
      // width:5px;
      // border-radius: 50%`}
        className={this.state.selected ?
          (this.state.clickable ? 'green clickable' : 'green')
          : this.state.clickable ? 'red clickable' : 'red'}
      onClick={this.togglePoint}>
      </span>

    )
  }
}
