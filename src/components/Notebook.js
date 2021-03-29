import React, { Component } from "react";
import Button from 'react-bootstrap/Button'


export default class Notebook extends Component {
    
    state = {
        chapters: [], 
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

    renderChapters = (chapter) => {
        // debugger
        return (
            <div>
                <h2>Chapters:</h2>
                <ol>
                {this.state.chapters.map(chapter => {
                    return <li className="list-group-item" onClick={() => this.renderChapter(chapter)}>{chapter.title}
                            <span className='badge' style={{float:'right'}}>{chapter.page_count}</span></li>
                })
                }
                </ol>
                <Button>Add a Chapter</Button>
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

