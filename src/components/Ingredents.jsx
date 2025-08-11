import React from 'react'

const Ingredents = ({ ingrdient }) => {
  return (
    <div className="recipe">
      {ingrdient.map((item) => (
        <p key={item.text}>{item.text}</p>
      ))}
    </div>
  );
};

export default Ingredents