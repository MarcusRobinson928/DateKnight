import React from 'react';

const WeatherResults = (props) => (
  <div className='weather'>
    <div>
        <div className="ui card">
            <div className="content">
                <div className="header">
                    <h4>{props.city}</h4>
                </div>
            </div>
                <div className="content">
                    <div className="description">
                        <h2>{props.currentTemp}</h2>
                    </div>
                </div>
                    <div className="extra content">
                        <h4>{props.currentText}</h4>
                    </div>  
        </div>
    </div>
  </div>

);

export default WeatherResults;