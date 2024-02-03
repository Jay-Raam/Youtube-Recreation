import React, { useState, useEffect } from "react";
import "./youtube.css";

const MusicApi = (props) => {
  const [videos, setVideos] = useState([]);
  const [newSearch, setNewSearch] = useState("tamil Music");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const API_KEY = "AIzaSyDiG8K9rBBYv-dE0kgJRmW2OMsox9jWYW8"; // Add your YouTube API key here
        const maxResults = 100;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&type=video&q=${newSearch}&maxResults=${maxResults}`
        );
        const data = await response.json();
        console.log(data.items);
        setVideos(data.items);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [newSearch]);

  const handleSearchBar = (e) => {
    const alteredSearch = e.target.value;
    setNewSearch(alteredSearch);
  };



  return (
    <div className="container">
      <h1 className="title"> {props.name} </h1>
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search"
          onChange={handleSearchBar}
        />
        <button className="search__button">
          <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
        </button>
      </div>
      <div className="videos">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video" >
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h2 className="title-2">{video.snippet.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicApi;
