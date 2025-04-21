import React, { useEffect, useState } from "react";
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

    const {id} = useParams();
    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key:"",
        published_at:"",
        typeof:""
    })

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjYxYzQ0MjUzYmZhY2EwZGI1ZjgyOTIwOThiNzQ0ZiIsIm5iZiI6MTczNjc5NDQwNS45MzI5OTk4LCJzdWIiOiI2Nzg1NjEyNTYwMWFjZmU3YmQ0ZjU2NmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6xjhrCInZp3FNPeX__saNCLIkO2zLWfm1QaKl8eUMTE'
        }
      };
      
      useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results[0]))
        .catch(err => console.error(err));

      },[])

    return (
        <div className="player">
            <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-3)}}/>
            <iframe width='90%' height='90%' src={`https:youtube.com/embed/${apiData.key}`}
            title="trailer" frameBorder='0' allowFullScreen></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0,10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default Player