import React, { Component } from "react";
import Page from './Page'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import TextEditor from "../slate/TextEditor";

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
            this.getPages()
            // console.log(data)
            // this.props.changeView('notebook')
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
                        <Popover id={`popover-positioned-${'bottom'}`}>
                        
                        <Popover.Content>                            
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <label htmlFor="fname">Content:</label>
                            <input onChange= {e => this.handleChange(e)}type="text" id="fname" name="fname"></input>
                            <input type="submit" value="Submit"></input>
                        </form>
                        </Popover.Content>
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
                        <Popover id={`popover-positioned-${'top'}`}>
                        
                        <Popover.Content>                            
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <label htmlFor="fname">Content:</label>
                            <div className='indexconatiner'>
                            <TextEditor></TextEditor></div>
                            <input onChange= {e => this.handleChange(e)}type="text" id="fname" name="fname"></input>
                            <input type="submit" value="Submit"></input>
                        </form>
                        </Popover.Content>
                        </Popover>
                    }
                    >
                    <Button variant="secondary">Create New Page</Button>
                    </OverlayTrigger>
                {/* {this.state.pages.map(page => {
                    return <div>
                        <Accordion >
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                Page {page.number}
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <Card.Body onClick={() => this.editPage(page)}>{page.content}</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                    })
                } */}
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

