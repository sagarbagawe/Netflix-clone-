import React, { useEffect, useRef, useState } from "react";
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from "react-router-dom";




const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([]);
    const CardsRef = useRef();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjYxYzQ0MjUzYmZhY2EwZGI1ZjgyOTIwOThiNzQ0ZiIsIm5iZiI6MTczNjc5NDQwNS45MzI5OTk4LCJzdWIiOiI2Nzg1NjEyNTYwMWFjZmU3YmQ0ZjU2NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6xjhrCInZp3FNPeX__saNCLIkO2zLWfm1QaKl8eUMTE'
        }
    };

    const handleWheel = (event) => {
        event.preventDefault();
        CardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(() => {

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setApiData(res.results))
            .catch(err => console.error(err));

        CardsRef.current.addEventListener('wheel', handleWheel);
    }, [])

    return (
        <div className="title-cards">
            <h2>{title ? title : "Popular on Netflix"}</h2>
            <div className="card-list" ref={CardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}
export default TitleCards