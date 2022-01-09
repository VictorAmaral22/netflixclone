import React, { useState, useEffect } from "react";
import './style.css';
import CloseIcon from '@mui/icons-material/Close';

export default ({item}) => {
    let firstDate = new Date(item.first_air_date);
    let genres = [];
    
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showingVideo, setShowingVideo] = useState(false);

    const showVideo = () => {
        return setShowingVideo(true);
    }
    const hideVideo = () => {
        return setShowingVideo(false);
    }

    useEffect(() => {
        setSelectedVideo(item.videos.results[0] ? item.videos.results[0].key : null);
    }, [])

    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`}}>

            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.name}</div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} pontos</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons} temporada{item.number_of_seasons != 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{item.overview.length > 220 ? item.overview.substring(0, 220)+'...' : item.overview}</div>
                    <div className="featured--buttons">
                        {item.videos.results.length > 0 &&
                            <button className="featured--watchbutton"
                            onClick={showVideo}
                            >▶ Assistir</button>
                        }
                        <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
                    </div>
                    <div className="featured--genres"><strong>Gêneros: </strong> {genres.join(', ')}</div>
                </div>
            </div>
            {/* video */}
            {showingVideo &&
                <div className="featured--video">
                    <CloseIcon onClick={hideVideo} style={{fontSize: 30}} className="featured--videoClose"/>
                    <iframe width={((window.innerHeight*75)/100)*1.77} height={(window.innerHeight*75)/100} src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>            
            }
        </section>
    )
}