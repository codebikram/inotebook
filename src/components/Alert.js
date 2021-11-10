import React from 'react'

function Alert(props) {
    return (
        <div className="alert alert-dark" style={{marginTop:"3.5rem"}}role="alert">
    {props.message}
      </div>
    )
}

export default Alert
