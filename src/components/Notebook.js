import React, { Component } from "react";
import Chapter from './Chapter'


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
              this.setState({
                  chapters: chapters
                })
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
            </div>
        )
        // this.state.chapters.map(chapter => <Chapter chapter={chapter} />)
    }

    render() {
        return (
            <div className="container m-3">
                <div className="row justify-content-md-center">
                       {this.renderChapters()}
                </div>
            </div>
        )
    }
}

