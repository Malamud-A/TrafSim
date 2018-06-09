import React from 'react';
import Point from './Point';

export default class Routes extends React.Component {
  constructor() {
    super();
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
      }}>
        {points.map((el, index) => {
          return <Point key={index} x={el[0]} y={el[1]}/>
        })}
      </div>
    )
  }
}