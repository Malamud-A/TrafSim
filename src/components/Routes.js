import React from 'react';
import Point from './Point';

export default class Routes extends React.Component {
  constructor() {
    super();

    this.clickPoint = this.clickPoint.bind(this);
  }
  
  clickPoint(x, y) {
    this.props.clickPoint(x, y);
  }


  render() {
    let points = [];
    for (let x = 0; x <= 10; x++) {
      for (let y = 0; y <= 10; y++) {
        points.push([x * 100, y * 100])
      }
    }
    return (
      <div style={{
        height: 1000,
        width: 1000,
        backgroundColor: 'transparent'
      }}
      className='points-container'>
        {points.map((el, index) => {
          const x = el[0];
          const y = el[1];
          const isSelected = getClickedPoint(this.props.clickedPoints, x / 100, 10 - (y / 100));
          return <Point selected={isSelected} clickPoint={this.clickPoint} key={index} x={x} y={y}/>
        })}
      </div>
    )
  }
}


function getClickedPoint(list, x, y) {
  if (list.map((el) => `${el.x},${el.y}`).includes(`${x},${y}`)) {
    return true;
  }
  return false;
}