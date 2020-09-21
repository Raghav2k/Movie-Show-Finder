import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import Results from '../Results'
import './styles.css'

class Search extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            query_val:"",
            is_query_movie: false,
            display: true,
            page_num: 1
        }
    }

    
    SubmitMovieQuery = async (e) => {
        await this.setState({is_query_movie: true});
        await this.setState({page_num: 1});
        this.props.search_key(this.state.query_val);
        this.props.display(this.state.display);
        this.props.is_query_movie(this.state.is_query_movie);
    }

    SubmitShowsQuery = async (e) => {
        await this.setState({is_query_movie: false});
        await this.setState({page_num: 1});
        this.props.search_key(this.state.query_val);
        this.props.is_query_movie(this.state.is_query_movie);
        this.props.display(this.state.display);
    }

    OnQueryChange = (e) => {
        this.setState({query_val: e.target.value});
    }

    render(){       
        return(
            <div>
            <Container> 
            <Row className = "searchbar">
                <Col> 
                    <input type="text" className="searchmovies" placeholder="Find Your Movie/Show..." onChange={this.OnQueryChange} /> 
                </Col>
            </Row>
                    <Row className = 'search_buttons'> 
                        <Link to='/results/movies'> 
                            <Col> 
                                <button className='movie_submit' onClick={this.SubmitMovieQuery}> Search Movie </button>
                            </Col>
                        </Link>
                        <Link to='/'>
                            <Col>
                                <button className='back_menu' onClick={event =>  window.location.href='/'}> Main Menu </button>
                            </Col>
                        </Link>
                        <Link to='/results/tv'>
                            <Col>
                                <button className='tv_submit' onClick={this.SubmitShowsQuery}> Search TV-Series</button>
                            </Col>
                        </Link>
                    </Row>
            </Container>
        </div>
        )
    }
};

export default Search;