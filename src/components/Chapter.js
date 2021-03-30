import React, { Component } from "react";
import Page from './Page'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'


// import Card from 'react-bootstrap/Accordion';

export default class Chapter extends Component {
           
    state = {
        pages: [],
        isOpen: false
    }

    getPages = () => {
        if(localStorage.getItem("token")) {
            fetch('http://localhost:3000/chapters/' + this.props.chapter.id + '/pages', {
              headers: {"Authorization": localStorage.token}
            })
            .then(r => r.json())
            .then(pages => {
              this.setState({
                  pages: pages
                })
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

    renderPages = () => {
        return (
            <div>
                <h2>{this.props.chapter.title}</h2>

                {this.state.pages.length > 0 && <Page pages={this.state.pages} />}
                
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
                       {this.renderPages()}
                </div>
            </div>
        )
    }
}

