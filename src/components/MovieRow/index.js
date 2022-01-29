import React, { useState } from "react";
import './style.css';
import Tmdb from '../../Tmdb';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default ({title, slug, items, setShowing, showing, setMovieData, movieData}) => {
    const [scrollX, setScrollX] = useState(-400);
    const handleLeftArrow = () => {
        let windowNum = Math.round(window.innerWidth/2);
        let x = scrollX+windowNum > 0 ? 0 : scrollX+windowNum;
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth/2);
        let listW = items.results.length * 150;
        setScrollX(window.innerWidth-listW > x ? (window.innerWidth-listW)-60 : x);
    }

    const showBigMovie = () => {
        return setShowing(true);
    }
    const setData = (data) => {
        return setMovieData(data);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item) => (
                        <div key={item.id} className="movieRow--item" 
                        onClick={async () => {
                            let type = '';
                            switch (slug) {
                                case 'originals':
                                    type = 'tv';
                                    break;
                                case 'toprated' || 'action' || 'comedy' || 'horror' || 'romance' || 'documentary':
                                    type = 'movie';
                                    break;
                                default:
                                    type = null;
                                    break;
                            }
                            let chosenInfo = await Tmdb.getMovieInfo(item.id, type);
                            showBigMovie();
                            setData(chosenInfo);
                        }}
                        >
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}