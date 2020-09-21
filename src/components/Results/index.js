import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'
import './styles.css'


class Results extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            result: [],
            loading: false,
            is_query_movie: this.props.is_query_movie,
            offset: 0,
            per_page: 0,
            current_page: this.props.page_num,
            page_count: 0,
            id_val: 0,
            display: this.props.display
        }
        console.log(this.state.current_page);
}
    async componentDidUpdate(prevProps){
        if(prevProps.query !== this.props.query || prevProps.is_query_movie !== this.props.is_query_movie){
            this.fetchData()
        }
    }

    fetchData = async () => {
            this.setState({display:true})
            let url = ''
            if(this.props.is_query_movie){
                url = 'https://api.themoviedb.org/3/search/movie?api_key=4f02959b89ceb660d5b1018f517488de&query='.concat(this.props.query).concat('&page=').concat(this.state.current_page);
                
            }
            else{
                url = 'https://api.themoviedb.org/3/search/tv?api_key=4f02959b89ceb660d5b1018f517488de&language=en-US&page=1&query='.concat(this.props.query).concat('&include_adult=false&page=').concat(this.state.current_page)
            }
            const response = await fetch (url);
            const data = await response.json();
            this.setState({result: data.results, loading:false});
            this.setState({page_count: Math.ceil(data.total_results/data.total_pages)})
    }


    nextPage = () => {

        if(this.state.result.length !== 0){
            this.setState({current_page: this.state.current_page+=1}, () => this.fetchData())
        }
    }

    prevPage = () => {
        if(this.state.result.length !== 0 && this.state.current_page !== 1){
            this.setState({current_page: this.state.current_page-=1}, () => this.fetchData())
        }
    }
    getSearchID = value => () => {
        this.setState({id_val: value})
    }

    changeView = () => {
        this.setState({display:false})
    }

    render(){
            var img_url = 'https://image.tmdb.org/t/p/w300';
            let hasPoster = this.state.result.filter(function (e) {
                return e.poster_path !== null;
            });
            if(this.state.loading || !this.state.movies){
                console.log('Loading')
            }
            return(
            <div>
                <Container className = 'background'>
                <Row className='header'>
                    
                </Row>
                {this.state.display ?
                <Row>
                {hasPoster.map(movie => (
                    <Col key = {movie.id} className = 'Posters'>
                        <Link to={{
                            pathname:`/details/${movie.id}`,
                            aboutProps: {
                                id: movie.id,
                                type: this.props.is_query_movie,
                            }
                        }} onClick={this.changeView}> 
                            <img  src = {img_url.concat(movie.poster_path)} alt = 'Posters' /> 
                        </Link>
                        <p className = 'MovieName'> {movie.name}</p>
                        <p className = 'MovieTitle'> {movie.title}</p>
                    </Col>
                ))}
                </Row>
                : null}
               
                
                {this.state.display ?
                <Row className='navigate'>
                    <Col>
                        <button onClick={this.nextPage}>Next</button>
                    </Col>
                    <Col>
                        <button onClick={this.prevPage}>Previous</button>
                    </Col>
                </Row>
                : null}
            </Container>
            </div>
        )
    }
};

export default Results;