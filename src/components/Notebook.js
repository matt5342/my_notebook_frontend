import React, { Component } from "react";
import Chapter from './Chapter'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button'


export default class Notebook extends Component {
    
    state = {
        chapters: [], 
        title: "",
        finished: true
    }

    handleChange = e => {
        this.setState({
            title: e.target.value
        })
    }

    getChapters = () => {
        if(localStorage.getItem("token")) {
            fetch('http://localhost:3000/chapters', {
              headers: {"Authorization": localStorage.token}
            })
            .then(r => r.json())
            .then(chapters => {
                // debugger
                if (Object.keys(chapters).includes("error")){
                    let noChapters = null
                    this.setState({ chapters: noChapters})
                }
                else {
                    this.setState({
                        chapters: chapters
                      })
                }
            })
        }
    }

    // addChapter = async (chapter, newTitle) => {
    //     api.post('http://localhost:3000/chapters', { title: newTitle })
         
    // }


    componentDidMount(){
        this.getChapters()
    }
    renderChapter = (chapter) => {
          return <>{this.props.changeView('chapter')}
                    {this.props.passChapter(chapter)}
                 </>
    }
    whichView = () => {
        
    }

    capitalWords = (chapter) => {
        let str = chapter.title.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());

        return str
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
        fetch('http://localhost:3000/users/' + this.props.user.id + '/chapter', reqObj)
        .then(r => r.json())
        .then(data => {
            // debugger
            this.setState({
                finished: false
            })
            this.props.changeView('notebook')
        }) 
    }
    




    renderChapters = (chapter) => {
        // debugger
        return (
            <div>
                <h2>Chapters:</h2>
                <ol>
                {this.state.chapters.map(chapter => {
                    return <li className="list-group-item" onClick={() => this.renderChapter(chapter)}><span className='' style={{float:'left'}}>{this.capitalWords(chapter)}</span>......................................................<span className='badge' style={{float:'right'}}>{chapter.page_count}</span></li>
                })
                }
                {/* This button renders the new chapter view */}

                <OverlayTrigger
                    trigger="click"
                    key={'bottom'}
                    placement={'bottom'}
                    overlay={
                        <Popover id={`popover-positioned-${'bottom'}`}>
                        
                        <Popover.Content>
                        <form>
                            <label for="fname">Title:</label>
                            <input onChange= {e => this.handleChange(e)}type="text" id="fname" name="fname"></input>
                            <input type="submit" value="Submit"></input>
                        </form>
                        </Popover.Content>
                        </Popover>
                    }
                    >
                    <Button variant="secondary">Create New Chapter</Button>
                    </OverlayTrigger>

                </ol>
               
            </div>
        )
    }

    renderIfNoChapters = () => {
        return (
            <div>
                <h2>No Chapters Yet!</h2>
                <Button>Add a Chapter</Button>
            </div>
        )
    }

    render() {
        return (
            <div className="container m-3">
                <div className="row justify-content-md-center">
                       { this.state.chapters ? this.renderChapters() : this.renderIfNoChapters() }
                </div>
            </div>
        )
    }
}
