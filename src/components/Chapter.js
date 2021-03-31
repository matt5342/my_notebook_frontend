import React, { Component } from "react";
import Page from './Page'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Jumbotron from 'react-bootstrap/Jumbotron'
import TextEditor from "../slate/TextEditor";
import { propTypes } from "react-bootstrap/esm/Image";

// import Card from 'react-bootstrap/Accordion';

export default class Chapter extends Component {
           
    state = {
        pages: [],
        isOpen: false, 
        content: ''
    }
    handleChange = e => {
        this.setState({
            content: e.target.value
        })
    }

    getPages = () => {
        if(localStorage.getItem("token")) {
            fetch('http://localhost:3000/chapters/' + this.props.chapter.id + '/pages', {
              headers: {"Authorization": localStorage.token}
            })
            .then(r => r.json())
            .then(pages => {
                // debugger
                if (Object.keys(pages).includes("error")){
                    let nopages = null
                    this.setState({ pages: nopages})
                }
                else {
                    this.setState({
                        isOpen: true,
                        pages: pages
                      })
                }
            })
        }
    }
    componentDidMount(){
        this.getPages()
    }
    editPage = (page) => {
        return 
            <>
                {this.props.changeView('page')}
                {this.props.passPage(page)}
            </>
    }


    handleSubmit = (e) => {
        e.preventDefault();
        let reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                page: {
                    content: this.state.content
                }
            })
        }
        fetch('http://localhost:3000/users/' + this.props.chapter.id + '/page', reqObj)
        .then(r => r.json())
        .then(data => {
            // debugger
            this.setState({
                isOpen: false
            })
            this.getPages()
            // console.log(data)
            this.props.changeView('chapter')
        }) 
    }

    renderIfNoPages = () => {
        // debugger
        return (
            <div>
                <h2>No Pages Yet!</h2>
                <OverlayTrigger

                    trigger="click"
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Popover style={{maxWidth:'90%', paddingTop:'40px'}} id={`popover-positioned-${'bottom'}`}>
                            <Jumbotron>
                            <Popover.Content>                            
                            <form onSubmit={(e) => this.handleSubmit(e)}>
                                {/* <label htmlFor="fname">Content:</label> */}
                                <h3>Content:</h3>
                                {/* <div className='indexconatiner'>
                                <TextEditor></TextEditor></div> */}
                                <textarea rows='20' cols='60' onChange= {e => this.handleChange(e)}type="text" id="fname" name="fname"></textarea>
                                <input type="submit" value="Submit"></input>
                            </form>
                            </Popover.Content>
                        </Jumbotron>
                        </Popover>
                    }
                    >
                    <Button variant="secondary">Create New Page</Button>
                    </OverlayTrigger>
            </div>
        )
    }

    renderPages = () => {
        return (
            <div>
                <h2>{this.props.chapter.title}</h2>
                {this.state.pages.length > 0 && <Page pages={this.state.pages} />}
                <OverlayTrigger
                    trigger="click"

                    key={'top'}
                    placement={'top'}
                    overlay={
                        <Popover style={{maxWidth:'90%', paddingTop:'40px'}}id={`popover-positioned-${'top'}`}>
                            <Jumbotron>
                                <Popover.Content>  
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <h3>Content:</h3>
                                        <textarea rows='20' cols='60' onChange= {e => this.handleChange(e)}type="text" id="fname" name="fname"></textarea>
                                        <input type="submit" value="Submit"></input>
                                    </form>
                                </Popover.Content>
                            </Jumbotron>
                        </Popover>
                    }
                    >
                    <Button variant="secondary">Create New Page</Button>
                    </OverlayTrigger>
            </div>
        )
    }

    render() {
        return (
            <div className="container m-3">
                <div className="row justify-content-md-center">
                    {this.state.pages ? this.renderPages() : this.renderIfNoPages() }

                </div>
            </div>
        )
    }
}

