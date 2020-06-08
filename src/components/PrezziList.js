import React from 'react'

const PrezziList = (props) => {
    return (
        <div>
          {props.antipasti.map(antipasto => {
              console.log(antipasto)
          })} 
        </div>
    )
}

export default PrezziList