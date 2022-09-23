import React from 'react'

const Card = (props) => {
  return (
    <div className='bg-lime-200 text-white p-3 rounded-md my-3 -skew-x-6 '>
        {props.children}
    </div>
  )
}

export default Card