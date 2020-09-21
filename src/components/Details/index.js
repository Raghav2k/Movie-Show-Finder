import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import key from '../../Key'
import './styles.css'
import ReactPlayer from "react-player"


class Details extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            details: [],
            video_results: {},
            cast: [],
            crew_memebers: [],
            genres: {}
        }
    }

    async componentDidMount(){
        let url = ''
        let cast_url = ''
        if(this.props.location.aboutProps.type || this.props.location.aboutProps.latest_type === 'movie'){
            url = 'https://api.themoviedb.org/3/movie/'.concat(this.props.location.aboutProps.id).concat('?api_key=').concat(key).concat('&language=en-US&append_to_response=videos');
            cast_url = 'https://api.themoviedb.org/3/movie/'.concat(this.props.location.aboutProps.id).concat('/credits?api_key='.concat(key));
        }
        else{
            url = 'https://api.themoviedb.org/3/tv/'.concat(this.props.location.aboutProps.id).concat('?api_key=').concat(key).concat('&language=en-US&append_to_response=videos');
            cast_url = 'https://api.themoviedb.org/3/tv/'.concat(this.props.location.aboutProps.id).concat('/credits?api_key='.concat(key));
        }
        const response = await fetch(url);
        const data = await response.json();
        this.setState({details: data});
        this.setState({video_results: data.videos.results})
        const response_cast = await fetch(cast_url);
        const data_cast = await response_cast.json();
        this.setState({cast: data_cast.cast})
        this.setState({crew_memebers: data_cast.crew})
        this.setState({genres: data.genres});
    }

    render(){
        const trailer_link = 'https://www.youtube.com/watch?v='
        let profilePic = this.state.cast.filter(function (e) {
            return e.profile_path !== null;
        });
        return(
            <div className = 'detail_background'>
                <Row className='movie_title'> 
                    <Col>
                        <h1>{this.state.details.original_title}</h1>
                        <h1>{this.state.details.name}</h1>  
                    </Col>
                </Row>

                {(this.props.location.aboutProps.type || this.props.location.aboutProps.latest_type === 'movie') ? 
                <Row className= 'movie_details'>
                    <Col>
                        Directed By: 
                        {this.state.crew_memebers.map(crew => 
                            crew.job === 'Director'? <p1> {crew.name} </p1>: null
                        )}
                    </Col>
                    <Col>
                            <p1> Release Date: {this.state.details.release_date}</p1>
                    </Col> 
                    <Col>
                            <p1> Runtime: {this.state.details.runtime} min</p1>
                    </Col>   
                    
                </Row> : 
                <Row className='tv_details'> 
                    <Col>
                        Created By:
                        {this.state.details.created_by ? this.state.details.created_by.map(creator => 
                            <li>{creator.name}</li> 
                        ): null}
                    </Col>

                    <Col>
                            <p1> First Air Date: {this.state.details.first_air_date}</p1>
                    </Col>

                    <Col> 
                            <p1> Episode Runtime: {this.state.details.episode_run_time} min</p1> 
                    </Col>

                    <Col>
                            <p1> Number of Seasons: {this.state.details.number_of_seasons}</p1> 
                    </Col>

                </Row>
                }

                <Row className='genres'> 
                    <Col>
                        Genre: 
                        {this.state.genres.length > 0 ? this.state.genres.map(genre =>
                            <li> {genre.name} </li> 
                        ) : null}
                    </Col>
                    
                </Row> 

                <Row  className='overview'>
                    <Col>
                        <p1 className='overview'> Overview: {this.state.details.overview}</p1>
                    </Col>
                </Row> 

                <Row className='cast'>
                        {profilePic.slice(0,9).map(actor => (
                            <li className='names'>{actor.name}
                            <img className='cast_pics' src={'https://image.tmdb.org/t/p/w300'.concat(actor.profile_path)} alt='Cast Pictures' />
                            </li>
                        ))}
                </Row>

                <Row className='detail_page'>
                        {this.state.video_results.length > 0 ? this.state.video_results.map(vids =>
                            vids.type === 'Trailer' ? <ReactPlayer className = 'trailer' url={trailer_link.concat(vids.key)} controls={true}/> : null
                        ) : null}
                </Row>
            </div>
        )
    }
};


export default Details;