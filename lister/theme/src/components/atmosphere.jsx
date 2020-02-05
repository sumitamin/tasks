import React from 'react'
import './forecast.css';

export default function Atmosphere(data) {
    const {atmosphere} = data.atmosphere
    return (
        <div className="card col-12 p-0">   
            <div className="card-body">
                <div className="h5"> Atmosphere </div>
                <hr/>
                { atmosphere?
                    <React.Fragment>
                        <div className="d-flex justify-content-between">  
                            <div className="sunrise"> Humidity: {atmosphere.humidity}  </div>
                            <div className="sunrise"> Visibility: {atmosphere.visibility} </div>
                        </div>
                        <div className="d-flex justify-content-between"> 
                            <div className="sunrise"> Pressure: {atmosphere.pressure} </div>
                            <div className="sunrise"> Rising {atmosphere.rising} </div>
                        </div>
                    </React.Fragment>
                : <div> Select City to see Atmosphere details</div>}
            </div>
        </div>
    )
}
