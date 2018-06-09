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
        };
        this.selectTransport = this.selectTransport.bind(this);
        this.selectPopulation = this.selectPopulation.bind(this);
        this.send = this.send.bind(this);
    }

    selectPopulation(e) {
        this.setState({ population: parseInt(e.target.value) });
    }

    selectTransport(e) {
        if (this.state.selectedTransport) {
            this.state.routes.push({
                transport: {
                    type: this.state.selectedTransport,
                },
                points: this.blocks.clickedPoints,
            });
            this.blocks.clickedPoints = [];
            this.blocks.forceUpdate();
        }
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
        });
    }

    render() {
        let blocks = [];

        for (let i = 0; i < 100; i++) {
            let idName = 'kvartal_' + i;
            blocks.push(<div className='kvartals' id={idName} key={i}></div>);
        }

        return <div>
            <div  ref="elem" className="container">
                {blocks}
                <Routes isAdding={this.state.selectedTransport} ref={(c) => {
                this.blocks = c;
                }}/>
                <div className="selector-form">
                    <select name="transport" id="transport" onChange={this.selectTransport} >
                        <option value="bus">Bus</option>
                        <option value="trolley">Trolley</option>
                        <option value="minibus">Minibus</option>
                    </select>
                    <input type="text" onChange={this.selectPopulation} />
                    <button onClick={this.send}>Send</button>
                </div>
            </div>
        </div>;
    }
}

export default App;
