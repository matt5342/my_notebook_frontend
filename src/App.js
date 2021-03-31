import React, { Component } from 'react';
import './App.css';
import FlippingPages from 'flipping-pages'
import 'flipping-pages/FlippingPages.css'
// import TextEditor from './slate/TextEditor'
import Login from './components/Login'
import Navigation from './components/Navigation';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Notebook from './components/Notebook';
import Chapter from './components/Chapter';
import Page from './components/Page';
import NewChapter from './components/NewChapter';

class App extends Component {

  state = {
    view: "default", 
    user: {}, 
    currentChapter: null, 
    currentPage: null, 
    isReady: false
  }

  setUser = (userObj) => {
    this.setState({
      user: userObj, 
      isReady: true
    })
  }
  handleLogout = () => {
    this.setUser({})
    localStorage.removeItem("token")
  }
  
  componentDidMount(){
    if(localStorage.getItem("token")) {
      fetch('http://localhost:3000/api/v1/login', {
        headers: {"Authorization": localStorage.token}
      })
      .then(r => r.json())
      .then(user => {
        // debugger
        this.setUser(user)
        })
    }
  }
  changeView = (newView) => {
    if (newView === 'logout'){
      this.handleLogout()
      this.setState({ view: "login"})
    }
    else{
      this.setState({ view: newView})
    }
  }
  renderView = () => {    
    switch (this.state.view) {
      case 'home':
        return <Home changeIsReady={this.changeIsReady} isReady={this.state.isReady} user={this.state.user} changeView={this.changeView} />
      case 'login':
        return <Login setUser={this.setUser} changeView={this.changeView} />
      case 'signup':
        return <SignUp setUser={this.setUser} changeView={this.changeView} />
      case 'notebook':
        return <Notebook user={this.state.user} passChapter={this.passChapter} changeView={this.changeView} />
      case 'chapter':
        return <Chapter chapter={this.state.currentChapter} passPage={this.passPage} user={this.state.user} changeView={this.changeView} />
      case 'page':
        return <Page page={this.state.currentPage} user={this.state.user} changeView={this.changeView} />
      case 'new chapter':
        return <NewChapter  user={this.state.user} changeView={this.changeView} />
      default: 
        return <Home changeIsReady={this.changeIsReady} isReady={this.state.isReady} user={this.state.user} changeView={this.changeView} />

    }
  }
  changeIsReady = () => {
    this.setState({
      isReady: !this.state.isReady
    })
  }
  passChapter = (chapter) => {
    this.setState({
      currentChapter: chapter
    })
  }
  passPage = (page) => {
    this.setState({
      currentPage: page
    })
  }

  render(){
    return (
  
      <div className="App">
        <Navigation view={this.state.view} user={this.state.user} handleLogout={this.handleLogout} changeView={this.changeView} />
        {this.renderView()}
        {/* <Login changeView={this.changeView} /> */}
        {/* <TextEditor /> */}
      </div>
    );
  }
}

export default App;
