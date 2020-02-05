import React from 'react'
import './forecast.css';

export default function Wind(data) {
    const {wind} = data.wind
    return (
        <div className="card col-12 p-0 mb-2">   
            <div className="card-body">
                <div className="h5"> Wind </div>
                <hr/>
                { wind?
                    <React.Fragment>
                    <div className="d-flex justify-content-between">  
                        <div className="sunrise">Chill: {wind.chill}  </div>
                        <div className="sunrise">Direction: {wind.direction} </div>
                    </div>
                     <div className="d-flex justify-content-between">  
                        <div className="sunrise">Speed: {wind.speed} </div>
                    </div>
                    </React.Fragment>
                : <div> Select City to see wind details</div>}
            </div>
        </div>
    )
}
