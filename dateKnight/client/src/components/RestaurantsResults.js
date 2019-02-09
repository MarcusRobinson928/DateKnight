import React from 'react';

const RestaurantsResults = (props) => (

  <div>
    {props.results.map((rest,i) => 
        <div key={i} className="results ui card" id="sights">
            <img floated='right' size='mini'src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+ rest.photos[0].photo_reference + '&key=AIzaSyBDsOr5y8ZuU83bfX_Ju2VlKUxbz65Ash8'} alt={rest.name} className="ui image"/>
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

export default RestaurantsResults;