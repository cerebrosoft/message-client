import React, { Component } from 'react';
import Moment from 'react-moment';
import './App.css';

const BASE_URL = 'http://localhost:5000';

export default class App extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            hits: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        fetch(BASE_URL + '/message')
            .then(response => response.json())
            .then(data => this.setState({ hits: data }));
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch(BASE_URL + '/message', {
            method: 'POST',
            body: data,
			}).then(response => response.json())
            .then(data => this.setState(prevState => ({
                hits: [data, ...prevState.hits]
            })));
    }

    render() {
        const { hits } = this.state;  
        return (
            <div class="App container">
                <form class="entry" onSubmit={this.handleSubmit}>
                    <h3>Add a Message</h3>
                    <div> 
                        <label htmlFor="name">Name:</label>
                    </div>
                    <div>
                        <input class="field" id="name" name="name" type="text" required="required" />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                    </div>
                    <div>
                        <input class="field" id="message" name="message" type="text" required="required" />
                    </div> 
                    <button>Submit</button>
                </form>
                <div>
                    <table class="messages">
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Message</th>  
                        </tr>
                   
                            {hits.map(function(item, key) {
                                return (
                                    <tr key = {key}>
                                        <td><Moment format="YYYY/MM/DD">{item.date}</Moment></td>
                                        <td>{item.name}</td>
                                        <td>{item.message}</td>
                                    </tr>
                                )
                            })}
                     
                    </table>
                </div>
            </div>
        )
    }
}
