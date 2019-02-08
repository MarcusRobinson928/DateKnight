import React, { Component } from 'react';
import * as axios from 'axios'
import $  from 'jquery'
import moment from 'moment'
import { Grid } from 'semantic-ui-react'
import DateType from './DateType'
import ResultPage from './ResultPage'
import MoviePage from './movieResults'
import WeatherResults from './WeatherResults'

const yelpConfig = {
  headers: {'Authorization': 'Bearer EXQwlZajZpkMHBMv9IEXQE07U_-N1uiKKtA047sgmrHb3ZlHvD6O5-xrVrpINtC-hMC6NHIELlVUa4yCY2NhX8aZjkevymrswP1tTtwgko4BF0YGSDWe49kSJItMXHYx'},
  params: {
    term: 'tacos'
  }
};

class HomePage extends Component {

  state = {
    music: false,
    dinner: false,
    movie: false,
    theater: false,
    sports: false,
    dateSelectionResults: [],
    userHistory: [],
    musicChoices: [],
    dinnerChoices: [],
    movieChoices: [],
    movieID: [],
    movieTrailerKey: [],
    movieTrailer: [],
    theaterChoices: [],
    sportsChoices: [],
    date: '',
    latitude: '',
    longitude: '',
    city: '',
    weatherTemp: '',
    weatherText: '',
  };

  componentWillMount() {
    this.getGeoLocation();
      this.getDate();
        this.getHistory();
  };

  // Function to reload Home Page
  resetHome = () => {
    window.location.href='http://localhost:3000/';
  };

  // Function to get current Geolocation
  getGeoLocation = () => {
    navigator.geolocation.getCurrentPosition(this.saveLocation);
  };

  // Function to get current date
  getDate = () => {
    let date = moment().add(7, 'days').format("YYYY-MM-DDThh:mm:ss");
    this.setState({date: date});
  };

  // Function to save latitude and longitude from Geolocation
  saveLocation = (position) => {
    this.setState({latitude: position.coords.latitude});
      this.setState({longitude: position.coords.longitude});  
  };
  
  // Function to take users selections and save them 
  selectedEvent = (event) => {
    let eventSelect = event.target.name
    console.log(eventSelect)
    this.setState({[eventSelect]: !this.state[eventSelect]});
    $(`.${eventSelect}`).css({'color': '#1DFF4E', 'display': 'block'});
  };

  // Function to handle posting the users selections to the database
  handleSubmit = () => {
    axios.post('/date', {dateSelections: this.state})
    .then(
      $(document.getElementsByClassName('selections')).css('display', 'none'),
        this.getDateSelectionResults(),
          this.getWeatherKey(),
    );
  };

  // Function to get selections from the database and call the appropiate function 
  getDateSelectionResults = () => {
    axios.get('/results')
    .then((result) => {
      this.setState({dateSelectionResults: result.data.dateSelections});
        this.isMusic();
          this.isTheater();
            this.isSports();
              this.getYelp()
                this.isMovie();
    });
  };

  // Function the get user selection history from the database
  getHistory =() => {
    axios.get('/history')
    .then((results) => {
      let data = results.data.slice(1).slice(-5)
      let history = data.map((results) => results.dateSelections)
        console.log(history)
        this.setState({userHistory: history})
    })
  }

  getWeatherKey = () => {
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=oiBcO3lzjAme6dQSmgDI6OFGQZ6GfZAI&q=${this.state.latitude},${this.state.longitude}`)
    .then(result =>  
      axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${result.data.Key}?apikey=oiBcO3lzjAme6dQSmgDI6OFGQZ6GfZAI&language=en-us&details=false`))
      .then(current => 
        this.setState({weatherTemp: current.data[0].Temperature.Imperial.Value}, this.setState({weatherText: current.data[0].WeatherText})));
  };

  getCity = () => {
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=oiBcO3lzjAme6dQSmgDI6OFGQZ6GfZAI&q=${this.state.latitude},${this.state.longitude}`)
    .then(city => 
      this.setState({city: city.data.ParentCity.LocalizedName}));
  };

  isMusic = () => {
    if(this.state.music === true){
      axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?latlong=${this.state.latitude},${this.state.longitude}&radius=25&classificationName=Music&endDateTime=${this.state.date}Z&apikey=N86FEwtnedq98If1KBfmgBFFh4Niz4aL`)
      .then(results => 
        this.setState({ musicChoices: results.data._embedded.events}));
    };
  };

  getYelp = () => {
    axios.get('https://api.yelp.com/v3/businesses/search', yelpConfig)
    .then(response => console.log(response))
      .catch((err) => {
        console.log(err)
      })
  };

  isMovie = () => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=b3268089e09ea14487266d14235b7164&language=en-US&page=1&region=us&adult=false`)
    .then(results => 
      this.setState({movieChoices: results.data.results}, 
        this.setState({movieID: results.data.results.map((rest) => rest.id)})));
  };

  getTrailerKey = () => {
    for(let i = 0; i < this.state.movieID.length; i++){
      let id = this.state.movieID[i]
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b3268089e09ea14487266d14235b7164&language=en-US`)
        .then(results =>
          console.log(results.data.results[0].key));
    };
  };

  getTrailer = () => {
    let key = this.state.movieTrailerKey
    axios.get(`https://www.youtube.com/watch?v=${key}`)
    .then(results => 
      this.setState({movieTrailer: results.data}))
  }

  isTheater = () => {
    if(this.state.theater === true){
      axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?latlong=${this.state.latitude},${this.state.longitude}&radius=25&classificationName=Arts & Theatre&endDateTime=${this.state.date}Z&apikey=N86FEwtnedq98If1KBfmgBFFh4Niz4aL`)
      .then(results => 
        this.setState({ theaterChoices: results.data._embedded.events}));
    };
  };

  isSports = () => {
    if(this.state.sports === true){
      axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?latlong=${this.state.latitude},${this.state.longitude}&radius=25&classificationName=Sports&endDateTime=${this.state.date}Z&apikey=N86FEwtnedq98If1KBfmgBFFh4Niz4aL`)
      .then(results => 
        this.setState({ sportsChoices: results.data._embedded.events}));
    };
  };

  render() {
    return (
      <div className='App'>
        <DateType
          selectedEvent={this.selectedEvent} 
          handleSubmit={this.handleSubmit}
          history={this.state.userHistory}
        />
          <WeatherResults 
            city={this.state.city} 
            currentTemp={this.state.weatherTemp} 
            currentText={this.state.weatherText}
          />
            <Grid columns={4} divided>
              <Grid.Row>
                <Grid.Column>
                  <h3>Live Events</h3>
                  <ResultPage results={this.state.musicChoices}/>
                  <ResultPage results={this.state.theaterChoices}/>
                  <ResultPage results={this.state.sportsChoices}/>
                </Grid.Column>
                  <Grid.Column>
                    <h3>Resturants</h3>
                    <ResultPage results={this.state.dinnerChoices}/>
                  </Grid.Column>
                    <Grid.Column>
                      <h3>Movies</h3>
                      <MoviePage results={this.state.movieChoices} />
                    </Grid.Column>
                      <Grid.Column>
                        <h3>Sights</h3>
                        <ResultPage results={this.state.dinnerChoices}/>
                      </Grid.Column>
                </Grid.Row>
              </Grid>
      </div>
    );
  };
};

export default HomePage;