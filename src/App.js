import React, { Component } from 'react';
import request from 'request';
import './App.css';
import Routes from './components/Routes';
// import Form from './components/Form';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTransport: null,
            routes: [],
            clickedPoints: [],
        };
        this.selectTransport = this.selectTransport.bind(this);
        this.selectPopulation = this.selectPopulation.bind(this);
        this.addRoute = this.addRoute.bind(this);
        this.clickPoint = this.clickPoint.bind(this);
        this.send = this.send.bind(this);
    }

    selectPopulation(e) {
        this.setState({ population: parseInt(e.target.value) });
    }

    clickPoint(x, y) {
        if (!getClickedPoint(this.state.clickedPoints, x, y)) {
            this.setState({
                clickedPoints: this.state.clickedPoints.concat({ x, y })
            });
        }
    }
    addRoute() {
        this.state.routes.push({
            transport: {
                type: this.state.selectedTransport,
            },
            points: this.state.clickedPoints,
        });
        this.setState({ clickedPoints: [] });
    }

    selectTransport(e) {
        this.setState({
            selectedTransport: e.target.value,
        });
    }

    send() {
        request({
            method: 'POST',
            uri: 'http://localhost:3000/api/city',
            json: true,
            body: {
                population: 1000,
                routes: this.state.routes,
            },
        }, (_, _2, body) => {
            Object.defineProperty(Array.prototype, 'chunk_inefficient', {
                value: function(chunkSize) {
                    var array=this;
                    return [].concat.apply([],
                      array.map(function(elem,i) {
                          return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
                      })
                    );
                }
            });
            const temp = body.chunk_inefficient(10).reverse();

            this.setState({ response: temp.reduce((a, b) => {
                return a.concat(b);
            }, []) });
        });
    }

    render() {
        let blocks = [];

        for (let i = 0; i < 100; i++) {
            let idName = 'kvartal_' + i;
            blocks.push(
              <div style={{
              backgroundColor: this.state.response ? this.state.response[i].color === 1 ? 'green' : this.state.response[i].color === 2 ? 'yellow' : 'red' : '',
              borderBottom: this.state.response ? this.state.response[i].sides.bottom === 1 ? '1px solid green' : this.state.response[i].sides.bottom === 2 ? '1px solid yellow' : '1px solid red' : '',
              borderTop: this.state.response ? this.state.response[i].sides.top === 1 ? '1px solid green' : this.state.response[i].sides.top === 2 ? '1px solid yellow' : '1px solid red' : '',
              borderLeft: this.state.response ? this.state.response[i].sides.left === 1 ? '1px solid green' : this.state.response[i].sides.left === 2 ? '1px solid yellow' : '1px solid red' : '',
              borderRight: this.state.response ? this.state.response[i].sides.right === 1 ? '1px solid green' : this.state.response[i].sides.right === 2 ? '1px solid yellow' : '1px solid red' : '',
              }} className='kvartals' id={idName} key={i}>

              </div>);
        }

        return <div>
            <div  ref="elem" className="container">
                {blocks}
                <Routes clickPoint={this.clickPoint} clickedPoints={this.state.clickedPoints} isAdding={this.state.selectedTransport} ref={(c) => {
                this.blocks = c;
                }}/>
                <div className="selector-form">
                    <select name="transport" id="transport" onChange={this.selectTransport} >
                        <option value="--">--</option>
                        <option value="bus">Bus</option>
                        <option value="trolley">Trolley</option>
                        <option value="minibus">Minibus</option>
                    </select>
                    <button onClick={this.addRoute}>Add route</button>
                    <input type="text" onChange={this.selectPopulation} />
                    <button onClick={this.send}>Send</button>
                </div>
            </div>
        </div>;
    }
}

export default App;


function getClickedPoint(list, x, y) {
    if (list.map((el) => `${el.x},${el.y}`).includes(`${x},${y}`)) {
        return true;
    }
    return false;
}