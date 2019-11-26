import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

interface IState {
  isLoading: boolean,
  userData: {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
    }
}

export default class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoading: true,
      userData: {
        id: -1,
        email: "",
        first_name: "",
        last_name: "",
        avatar: ""
      }
    };
  }

  componentDidMount() {
    const randomId = Math.floor((Math.random() * 10) + 1);
    const apiEndpoint = `https://reqres.in/api/users/${randomId}`;
    this.getData(apiEndpoint)
  }

  getData = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json()

      this.setState({
        isLoading: false,
        userData: data.data
      })

    } catch (e) {
      console.error(e);
      this.setState({
        isLoading: false,
        userData: {
          id: -1,
          email: "",
          first_name: "",
          last_name: "",
          avatar: ""
        }
      })
    }
  }

  render() {
    const userFetchResponse = this.state.userData;

    if (userFetchResponse.id < 0 || this.state.isLoading) {
      return 'Loading...'
    }

    const { first_name, last_name, avatar } = userFetchResponse

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h3>Name: {first_name} {last_name}</h3>
            <div><img src={avatar} alt="avatar"/></div>
          </div>
        </header>
      </div>
    );
  }
}
