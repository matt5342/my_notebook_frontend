import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import TextEditor from './slate/TextEditor'
import Login from './components/Login'

class App extends Component {

  state = {
    view: "login"
  }

  changeToNotebook = () => {

    this.setState({ view: 'notebook'})

  }



  componentDidMount(){
        fetch('http://localhost:3000/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
        // Authorization: 'Bearer '
      },
      body: JSON.stringify({
        user: {
          username: "tokenpls",
          password: "whatscooking",
          bio: "Sylvia Woods was an American restaurateur who founded the sould food restaurant Sylvia's in Harlem on Lenox Avenue, New York City in 1962. She published two cookbooks and was an important figure in the community.",
          avatar: "https://upload.wikimedia.org/wikipedia/commons/4/49/Syvia_of_Sylvia%27s_reaturant_N.Y.C_%28cropped%29.jpg"
        }
      })
    })
      .then(r => r.json())
      .then(console.log) 
  }


  render(){
    return (
  
      <div className="App">

        <Login changeToNotebook= {this.changeToNotebook}/>

        <TextEditor />
      </div>
    );
  }
}

export default App;
