import React, { use } from "react";
import { useDebounce } from "react-use";
import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Meals from "./components/Meals";
import Spinner from "./components/Spinner";

function App() {
  const [apiData, setApiData] = useState("");
  const [image, setImage] = useState("");
  const [loding, setLoading] = useState(false);
  const APP_KEY = import.meta.env.VITE_EDAMAM_API_KEY;
  const APP_ID = import.meta.env.VITE_EDAMAM_API_ID;
  const [search, setSearch] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  useDebounce(()=>{
    if(!search || search === 0){
      setDebounceSearchTerm("Entree")
    }else{
    setDebounceSearchTerm(search)
    }
  },700,[search])
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const fetchData = async () => {
    setLoading(true);
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${debounceSearchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    try {
      const response = await fetch(url, {
        headers: {
          "Edamam-Account-User": APP_ID,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setApiData(data);
      setImage(data.hits[0].recipe.image);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [debounceSearchTerm]);

  return (
    <>
      <div className="center-wrapper">
        <div className="main-continer">
          <div className="logos">
            <img src="logo.png" alt="Logo" className="logo" />
            <h2 className="logo-name">Smart Plate</h2>
          </div>

          <div className="slogans">
            <h1 className="slogan1">Simpilfy Your Meals, Savor Your life</h1>
            <p className="slogan2">
              Effort less meal planning, personalized just for you
            </p>
          </div>
          <div className="btn-and-search">
            <button>Get Started</button>
            <FontAwesomeIcon icon={faSearch} className="searchicon" />
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={handleChange}
            />
          </div>
          <div className="food-search"></div>
        </div>
      </div>
      <div className="meal">
        {loding ? <Spinner /> : <Meals data={apiData} />}
      </div>
    </>
  );
}

export default App;
