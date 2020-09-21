import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Details from '../Details'
import {Link} from 'react-router-dom'
import './styles.css'

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            movies:[],
            loading:false,
            item_id: 0,
            ismovie: true
        }
    }
    async componentDidMount(){
        const url = "https://api.themoviedb.org/3/trending/all/day?api_key=4f02959b89ceb660d5b1018f517488de";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({movies: data.results, loading:false});
    }

    getID  = (value, type) => () => {
        this.setState({item_id: value})
        this.setState({ismovie: type})
    }

    render(){

        let hasPoster = this.state.movies.filter(function (e) {
            return e.poster_path !== null;
        });
        var img_url = 'https://image.tmdb.org/t/p/w300';
        if(this.state.loading || !this.state.movies){
            console.log('Loading');
        }
        return( 
            <div>
                <Container className = 'background'>
                    <Row>
                    {hasPoster.map(movie => (
                        <Col key = {movie.id} className = 'Posters'>
                            <Link to={{
                            pathname:`/details/${movie.id}`,
                            aboutProps: {
                                id: movie.id,
                                latest_type: movie.media_type
                            }
                        }}> 
                                <img  src = {img_url.concat(movie.poster_path)} alt = 'Posters' /> 
                            </Link>
                            <p className = 'MovieName'> {movie.name}</p>
                            <p className = 'MovieTitle'> {movie.title}</p>
                        </Col>
                    ))}
                    </Row>
                </Container>
            </div>    
        )
    }
};
export default Home;

