import React, { Component } from 'react';
import './App.css';
import Routes from './components/Routes';
import Form from './components/Form';

class App extends Component {
    constructor(props) {
        super(props);
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
                <Routes/>

            </div>
            <Form/>
        </div>;
    }
}

export default App;
