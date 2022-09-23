import React from 'react'

const Layout = (props) => {
  return (
    <div className='container-fluid'>
        <div className="row">
            {props.children}
        </div>
    </div>
  )
}

export default Layout