import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import FlippingPages from 'flipping-pages'
/* IMPORTANT */
import 'flipping-pages/FlippingPages.css'

let book_background = require(`../assets/blank_book_cover.jpeg`) 

class Home extends Component {


    state = {
        notebook: [],
        finished: false, 
        title: ''
    }
    
    getNotebook = () => {
        // debugger
        if(localStorage.getItem("token")) {
            fetch('http://localhost:3000/users/' + this.props.user.id + '/notebook', {
                headers: {"Authorization": localStorage.token}
            })
            .then(r => r.json())
            .then(notebook => {
                // debugger
                if (Object.keys(notebook).includes("error")){
                    let noNotebook = null
                    this.setState({ notebook: noNotebook, finished: true})
                }
                else {
                    this.setState({
                        notebook: notebook, 
                        finished: true
                    })
                }
            })
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                notebook: {
                    title: this.state.title
                }
            })
        }
        fetch('http://localhost:3000/users/' + this.props.user.id + '/notebook', reqObj)
        .then(r => r.json())
        .then(data => {
            // debugger
            this.setState({
                finished: false
            })
            this.props.changeView('home')
        }) 
    }
    renderNotebook = () => {
        if (this.state.finished){
            return
        }   
        else if (this.props.isReady){
            this.getNotebook()
        }
    }
    
    renderIfNoNotebook = () => {
        // debugger
        return (
            <div>
                <h2>No Title Yet</h2>
                <OverlayTrigger
                    trigger="click"
                    key={'top'}
                    placement={'top'}
                    overlay={
                        <Popover id={`popover-positioned-${'top'}`}>
                        <Popover.Content>
                                <form onSubmit={(e) => this.handleSubmit(e)}>
                                    <label for="fname">Title:</label>
                                    <input type="text" name="title" placeholder="Example Title" onChange={e => this.handleChange(e)}></input>
                                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                                </form>
                        </Popover.Content>
                        </Popover>
                    }
                    >
                    <Button variant="secondary">Add a Title</Button>
                </OverlayTrigger>
            </div>
        )
    }
    render() {
        return (
            <div
            className="Home"
            style={{
                backgroundImage: 'url("http://2.bp.blogspot.com/-MEkIz1Bld0c/T_4oRfvREPI/AAAAAAAAA8k/wZHwb6kUPlw/s1600/blank+book+cover.jpg")',
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                height: "100vh",
                color: "#f5f5f5", 
                backgroundPosition: "center"
            }}
            >
              <div style={{paddingTop: '200px'}}>
                  <h3>
                    {this.renderNotebook()}
                    { this.state.notebook ? this.state.notebook.title : this.renderIfNoNotebook()
                    } 
                  </h3>
              </div>

            </div>
        )
    }
}
export default Home
// constructor(props) {
//     super(props)
//     this.totalPages = 4
//     this.state = {
//         selected: 0,
//     }
//     this.handleSelectedChange = this.handleSelectedChange.bind(this)
//     this.previous = this.previous.bind(this)
//     this.next = this.next.bind(this)
// }

// handleSelectedChange(selected) {
//     this.setState({selected})
// }

// previous() {
//     this.setState(state => ({
//         selected: state.selected - 1
//     }))
// }

// next() {
//     this.setState(state => ({
//         selected: state.selected + 1
//     }))
// }

// {/* <FlippingPages
//      className="Home-pages"
//      direction="horizontal"
//      selected={this.state.selected}
//      onSelectedChange={this.handleSelectedChange}
//      /* touch-action attribute is required by pointer events
//      polyfill */
//      touch-action="none"
//  >
//      <div className="Home-page Home-page_red">0</div>
//      <div className="Home-page Home-page_green">1</div>
//      <div className="Home-page Home-page_blue">2</div>
//      <div className="Home-page Home-page_orange">3</div>
//  </FlippingPages>
//  {/* Buttons are required for keyboard navigation */}
//  <button
//      onClick={this.previous}
//      disabled={!this.state.selected}
//  >Previous</button>
//  <button
//      onClick={this.next}
//      disabled={this.state.selected + 1 === this.totalPages}
//  >Next</button> */}