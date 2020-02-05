import React from 'react'
import './forecast.css';

export default function Astronomy(data) {
    const {astronomy} = data.astronomy
    return (
        <div className="card col-12 p-0">   
            <div className="card-body">
                <div className="h5"> Astronomy </div>
                <hr/>
                { astronomy?
                    <div className="d-flex justify-content-between">  
                        <div className="sunrise">Sunrise: {astronomy.sunrise}  </div>
                        <div className="sunrise">Sunset: {astronomy.sunset} </div>
                    </div>
                : <div> Select City to see Astronomy details</div>}
            </div>
        </div>
    )
}
