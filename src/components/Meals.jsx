import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Meals = ({data}) => {
   if (!data || data === 0) {
      return <div></div>;
    }
    
    const {hits} = data;
    
  return (
    <div className="meal-grid">
      {hits.map((item) => (
        <div className="meal-card" key={item.recipe.uri}>
          <div className="meal-image">
            <img src={item.recipe.image} alt="" />
          </div>
          <div className="meal-info">
            <h3>{item.recipe.label}</h3>
            <p>{Math.floor(item.recipe.calories)} cal</p>
            <p className="ingredients">ingredients</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Meals