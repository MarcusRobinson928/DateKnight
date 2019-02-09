import React from 'react';

const MoviePage = (props) => (

  <div>
    {props.results.map((rest,i) => 
        <div key={i} className="results ui card" id="movies">
            <img floated='right' size='mini'src={'https://image.tmdb.org/t/p/w370_and_h556_bestv2' + rest.poster_path} alt={rest.title} className="ui image"/>
                <div className="content">
                    <div className="header">
                        {rest.title}
                    </div>
                        <div className="meta">
                            {new Date(rest.release_date).toDateString()}
                        </div>
                            <div className="description">
                                {rest.overview}
                            </div>
                </div>
                            <div className="extra content">
                                <button className="user icon" onClick={() => window.open('https://www.youtube.com/watch?v=' + props.trailer[i])}>
                                    Trailer 
                                </button>
                            </div>
        </div>)}
  </div>
);

export default MoviePage;