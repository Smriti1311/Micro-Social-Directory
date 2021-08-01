import React, { Component } from 'react';
import axios from 'axios';
import ListUsers from './ListUsers';

class FetchData extends Component {
    state = {
        usersData: []
    }

    componentDidMount() {
        console.log('component did mount');
        axios.get('https://randomuser.me/api/?results=100')
            .then(response => {
                const usersData = response.data.results;
                this.setState({ usersData: usersData });
            })
    }
    render() {
        //console.log('render',this.state.usersData);
        return (
          <ListUsers usersData = {this.state.usersData} />
        );
    }
}

export default FetchData;