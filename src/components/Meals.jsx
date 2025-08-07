import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ingredents from "./Ingredents";

const Meals = ({ data, searchFound, ingredients }) => {
  if (!data || data === 0) {
    return <div></div>;
  }
  if (!searchFound || searchFound === false) {
    return <h2 className="no-meals">No meals found</h2>;
  }
  const { hits } = data;

  const [isDisplaying, setIsDisplaying] = useState(false)
  const [selectedMealUrl, setSelectedMealUrl] = useState(null);

  return (
    <div className="meal-grid">
      {hits.map((item) => (
        <div className="meal-card" key={item.recipe.url}>
          <div className="meal-image">
            <img src={item.recipe.image} alt="" />
          </div>
          <div className="meal-info">
            <h3>{item.recipe.label}</h3>
            <p>{Math.floor(item.recipe.calories)} cal</p>
            <p
              className="ingredients"
              onClick={() => {
                setSelectedMealUrl(item.recipe.url); 
                setIsDisplaying(!isDisplaying)}}
            >
              ingredients
            </p>

            {selectedMealUrl === item.recipe.url && (
              !isDisplaying || isDisplaying === false ? null :
              <Ingredents ingrdient={item.recipe.ingredients} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Meals;
