import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from '../../components/movie-list/MovieList';
const Detail = () => {
  const {category, id} = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, {params:{}});
      setItem(response);
      window.scrollTo(0,0);
  }
    getDetail();
  }, [category,id])
  return (
    <div>
      {
        item && (
         <>
           <div className='banner' style={{backgroundImage : `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
           <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div className="movie-content__poster__img" style={{backgroundImage : `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
            </div>
            <div className="movie-content__info">
              <h2 className="title">
                {item.title || item.name}
              </h2>
              <div className="genres">
                {
                  item.genres && item.genres.slice(0,5).map((genre,i) => {
                    return <span className='genres__item' key={i}>{genre.name}</span>
                  })
                }
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Castes</h2>
                </div>
                <CastList id = {item.id}/>
              </div>
            </div>
           </div>
           <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id}/>
            </div>
            <div className="section__header mb-2">
                <h2>Similar</h2>
            </div>
            <MovieList category={category} type='similar' id={item.id}/>
           </div>
         </>
        )
      }
    </div>
  )
}

export default Detail