import React from 'react'

const Ingredents = ({ ingrdient }) => {
  return ( <div className='recipe'>
    {ingrdient.map((item)=>(
        <p>{item.text}</p>
    ))}
  </div>
  )
};

export default Ingredents