import React, { Component } from 'react'


export default class Page extends Component {
    

    state = {
        selectedPage: {},
        pages: [],
        counter: 0, 
        orderedPages: this.props.pages,
    }

    changePage = (page) => {
        // debugger
        this.setState({selectedPage: page})
    //     if(this.props.pages[this.state.counter + 1]){
    //         let newCounter = this.state.counter + 1
    //         this.setState({
    //             counter: newCounter, 
    //             selectedPage: this.props.pages[this.state.counter]
    //         })
    // }

    }

    componentDidMount(){
        // debugger
        // let orderedPages = this.props.pages
        // let placeholder = this.state.orderedPages[0]
        // this.state.orderedPages.shift()
        // this.state.orderedPages.push(placeholder)

        this.state.orderedPages.sort((a, b) => {
            if (a.number > b.number) {
                return 1;
            }
            if (a.number < b.number) {
                return -1;
            }
            return 0
        })

        if(this.props.pages.length > 0){
            this.changePage(this.state.orderedPages[0]) 
        }
        console.log(this.props.pages)

        // this.setState({pages: this.props.pages})
        // debugger
    }

    nextPage = () => {

    }
    renderPages = () => {
        return (
            <div className="pagescontainer">
                <div className="selectedpage" >
                    <textarea value={this.state.selectedPage.content} ></textarea>
                </div>
                <div className= "indexcontainer"> 
                    {this.state.orderedPages.map((page,i) => 
                        <button onClick={()=>this.changePage(page)} key={i}>{page.number}</button>

                        )}
                </div>
            </div>
            
        )
    }

    render() {
        return (
            <>
                {this.renderPages() }
            </>
        )
    }
}











