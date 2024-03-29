import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import './App.css'
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import BigMovie from './components/bigMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [showingBigMovie, setShowingBigMovie] = useState(false);
  const [bigMovieData, setBigMovieData] = useState(null);
  useEffect(()=>{
    const loadAll = async () => {
      // Lista completa
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Destaque
      let originals = list.filter(i => i.slug === 'originals');
      let random = Math.floor(Math.random() * (originals[0].items.results.length -1));
      let chosen = originals[0].items.results[random];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo);
    }
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className='page'>
      {/* Header */}
      <Header black={(blackHeader || showingBigMovie)} />
      
      {/* Destaque */}
      {featuredData &&
       <FeaturedMovie item={featuredData} />
      }

      {/* Listas ... */}
      <section className='lists' style={{marginTop: -150+(window.innerWidth/30)}}>
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} slug={item.slug} items={item.items} setMovieData={setBigMovieData} movieData={bigMovieData} setShowing={setShowingBigMovie} showing={showingBigMovie}/>
        ))}
      </section>
      {showingBigMovie &&
        <div className='backDrop' >
          asdasdasd
          <BigMovie item={bigMovieData} type={bigMovieData} setShowing={setShowingBigMovie} showing={showingBigMovie}/>
        </div>
      }

      {/* Rodapé */}
      <footer>
        Feito por Victor Amaral, baseado no vídeo <a href='https://www.youtube.com/watch?v=tBweoUiMsDg&t=8791s'><i>🔥 Clone do NETFLIX em REACTJS para Iniciantes</i></a>
        <br />
        Dados pegos do site <a href='https://www.themoviedb.org/'>Themoviedb.org</a>
        <br />
        Todos os direitos de imagem para Netflix.
      </footer>
      {movieList >= 0 && 
        <div className='loading'>
          <img src='https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif' alt='Carregando' />
        </div>      
      }
    </div>
  )
}