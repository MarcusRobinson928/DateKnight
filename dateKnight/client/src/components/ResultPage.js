import React from 'react';

const ResultPage = (props) => (

  <div>
    {props.results.map((rest,i) => 
      <div key={i} className="results ui card" id={props.results[0].classifications[0].segment.name}>
        <img floated='right' size='mini' src={rest.images[0].url} alt={rest.name} className="ui image"/>
        <div className="content">
          <div className="header">
            {rest.name}
          </div>
            <div className="meta">
              {new Date(rest.dates.start.localDate).toDateString()}
            </div>
              <div className="description">
                {rest._embedded.venues[0].name}
              </div>
        </div>
                <div className="extra content">
                  <button className="user icon" onClick={() => window.open(rest.url)} target="_blank">
                    Purchase  
                  </button>
                </div>
      </div>
    )};
  </div>
);

export default ResultPage;
