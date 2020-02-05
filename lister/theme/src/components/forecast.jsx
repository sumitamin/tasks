import React from 'react';
import './forecast.css';

export default function Forecast(data) {
    return (
                            
        <div className="card col-12 p-0">   
            <div className="card-body">
                <div className="h5"> Forecast </div>
                <hr/>
                { data.forecasts.map( (element, index) => 
                    <div key={index} className="d-flex justify-content-between">  
                        <div className="dayDiv"> {element.day}  </div>
                        <div className="lowDiv"> <i className="fa fa-temperature-low"></i> {element.low} </div>
                        <div className="highDiv"> <i className="fa fa-temperature-high"></i> {element.high} </div>
                        <div className="textDiv"> 
                        {element.text.indexOf('Cloudy') > -1? <i className="fa fa-cloud"></i>  : ''}
                        {element.text.indexOf('Sun') > -1? <i className="far fa-sun"></i>  : ''}
                        {element.text.indexOf('Breezy') > -1? <i className="fa fa-wind"></i>  : ''}
                        {element.text.indexOf('Rain') > -1? <i className="fa fa-cloud-rain"></i>  : ''}
                        {element.text.indexOf('Shower') > -1? <i className="fa fa-cloud-showers-heavy"></i>  : ''}
                        {element.text.indexOf('Thunder') > -1? <i className="fa fa-bolt"></i>  : ''}
                    </div>
                </div>
                ) }
            </div>
        </div>
    )
}
