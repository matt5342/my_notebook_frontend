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
    
    
    constructor(props) {
        super(props)
        this.totalPages = 100
        this.state = {
            selected: 0,
            notebook: [],
            finished: false, 
            title: ''
        }
        this.handleSelectedChange = this.handleSelectedChange.bind(this)
        this.previous = this.previous.bind(this)
        this.next = this.next.bind(this)
    }
    
    handleSelectedChange(selected) {
        this.setState({selected})
        setTimeout(() => {
            this.props.changeView("notebook")
        }, 500)
    }
    
    previous() {
        this.setState(state => ({
            selected: state.selected - 1
        }))
    }
    
    next() {
        this.setState(state => ({
            selected: state.selected + 1
        }))
        setTimeout(() => {
            this.props.changeView("notebook")
        }, 500)
    }
    renderPageFlip = () => {
        // debugger
        return (
            <div className="Home">
            <FlippingPages
                className="Home-pages"
                direction="horizontal"
                selected={this.state.selected}
                onSelectedChange={this.handleSelectedChange}
                touch-action="none"
                >
                <div className="Home-page Home-page_red">{this.state.notebook.title}</div>
                {this.nextPage()}
                {/* <div className="Home-page Home-page_blue">{this.state.selected}</div>
                <div className="Home-page Home-page_orange">3</div> */}
            </FlippingPages>
            {/* Buttons are required for keyboard navigation */}
            <button
                onClick={this.previous}
                disabled={!this.state.selected}
                >Previous</button>
            <button
                onClick={this.next}
                disabled={this.state.selected + 1 === this.totalPages}
                >Next</button> 
           </div> 
        )
        
    }
    nextPage = () => {
        // debugger
        return <div className="Home-page Home-page_green"></div>
        // return <div className="Home-page Home-page_green">{this.state.selected}</div>
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
                    // this.renderPageFlip()
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
            this.getNotebook()
            // this.props.changeIsReady()
            // this.props.changeIsReady()
            this.props.changeView('home')
            // this.forceUpdate()
        }) 
    }
    renderNotebook = () => {
        if (this.state.finished){
            return
        }   
        else if (this.props.isReady){
            // debugger
            this.getNotebook()
            // const runBoth = () => {
            //     this.getNotebook()
            //     this.renderPageFlip()
            // }
            // runBoth()
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
                // backgroundImage: 'url("http://2.bp.blogspot.com/-MEkIz1Bld0c/T_4oRfvREPI/AAAAAAAAA8k/wZHwb6kUPlw/s1600/blank+book+cover.jpg")',
                // backgroundSize: "contain",
                // backgroundRepeat: "no-repeat",
                // height: "100vh",
                // color: "#f5f5f5", 
                // backgroundPosition: "center"
            }}
            >
                {/* style={{paddingTop: '200px'}} */}
              <div >
                  <h3>
                    {this.state.notebook ? this.renderNotebook() : this.renderIfNoNotebook()}
                    {/* { this.state.notebook ? this.state.notebook.title : this.renderIfNoNotebook()}  */}
                    {this.state.notebook ? this.renderPageFlip() : null}
                  </h3>
              </div>

            </div>
        )
    }
}
export default Home
