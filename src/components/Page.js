import React, { Component } from 'react'


export default class Page extends Component {
    
    
    state = {
        selectedPage: {},
        pages: [{id:1},{id:2},{id:3}],
    }

    changePage = (page) => {
        this.setState({selectedPage: page})

    }

    componentDidMount(){
        if(this.props.pages.length > 0){
            this.changePage(this.props.pages[0]) 
        }
        console.log(this.props.pages)
        // this.setState({pages: this.props.pages})
    }

    render() {
        return (
            <div className="pagescontainer">
                <div className="selectedpage" >
                    <textarea value={this.state.selectedPage.content} ></textarea>
                </div>
                <div className= "indexcontainer"> 
                    {this.props.pages.map((page,i) => 
                        <div onClick={()=>this.changePage(page)} key={i}>{page.id}</div>

                        )}
                </div>
            </div>
        )
    }
}











