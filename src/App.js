import React from 'react'

import Search from './components/Search'
import Results from './components/Results'
import './App.css'

class App extends React.Component{

    constructor(props){
        super(props);
            this.state = {
                query: "",
                is_query_movie: true,
                display: false,
                clicked_poster: false,
                page_num:1
            }
    }
    handle = (e) => {
        this.setState({query:e});
    }

    movies_or_shows = (e) => {
        this.setState({is_query_movie:e});
    }

    showsResults = (e) => {
        this.setState({display: e});
    }

    resetPages = (e) => {
        this.setState({page_num: e});
    }

    render(){

        return(
            <div className = 'App'>
                <h1 className='header_title'> Search Movies/TV-Shows</h1>
                <Search search_key={this.handle} is_query_movie={this.movies_or_shows} display={this.showsResults}/>
                <Results query={this.state.query} is_query_movie={this.state.is_query_movie} display={this.state.display} page_num={this.state.page_num}/>
            </div>
        )
    }
};

export default App;