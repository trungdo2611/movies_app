import React, { useEffect, useState } from "react";
import ProTypes from "prop-types";
import "./movie-list.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Button from "../button/Button";
import tmdbApi, { category } from '../../api/tmdbApi';
import apiConfig from "../../api/apiConfig";
import MovieCard from "../movie-card/MovieCard";
const MovieList = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setItems(response.results);
    };
    getList();
  }, []);
  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item= {item} category={props.category}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.prototype = {
  category: ProTypes.string.isRequired,
  type: ProTypes.string.isRequired,
};
export default MovieList;
