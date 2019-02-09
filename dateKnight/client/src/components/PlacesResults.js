import React from 'react';

const PlacesResults = (props) => (

  <div>
    {props.results.map((rest,i) => 
        <div key={i} className="results ui card" id="sights">
            {/* <img floated='right' size='mini'src={'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + rest.poster_path} alt={rest.title} className="ui image"/> */}
                <div className="content">
                    <div className="header">
                        {rest.name}
                    </div>
                        <div className="meta">
                           Rating: {rest.rating}
                        </div>
                            <div className="description">
                                {rest.formatted_address}
                            </div>
                </div>
                            <div className="extra content">
                            
                            </div>
        </div>
        )}
  </div>
);

export default PlacesResults;