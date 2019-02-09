import React, { Component } from 'react';
import * as axios from 'axios'
import $  from 'jquery'
import moment from 'moment'
import { Grid } from 'semantic-ui-react'
import DateType from './DateType'
import ResultPage from './ResultPage'
import MoviePage from './movieResults'
import PlacesResults from './PlacesResults'
import WeatherResults from './WeatherResults'
import RestaurantsResults from './RestaurantsResults'

class HomePage extends Component {

  state = {
    music: false,
    theater: false,
    sports: false,
    dateSelectionResults: [],
    userHistory: [],
    musicChoices: [],
    restaurantsChoices: [],
    movieChoices: [],
    movieID: [],
    movieTrailerKey: [],
    movieTrailer: [],
    theaterChoices: [],
    sportsChoices: [],
    places: [],
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
          this.handleChange();
  };

  handleChange = () => {
    $('.weather').css({'visibility': 'hidden'})
  }

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
      this.getCity();  
  };
  
  // Function to take users selections and save them 
  selectedEvent = (event) => {
    let eventSelect = event.target.name
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
              this.isMovie()
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
                this.getRestaurants();
                  this.getTrailerKey()
                    this.getPlaces()
      });
  };

  // Function the get user selection history from the database
  getHistory =() => {
    axios.get('/history')
    .then((results) => {
      let data = results.data.slice(1).slice(-5)
      let history = data.map((results) => results.dateSelections)
        this.setState({userHistory: history})
    })
  }

  getWeatherKey = () => {
    axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=1gAziFvZ0LGxbqOnl1X6GxBww1jHxQAa&q=${this.state.latitude},${this.state.longitude}`)
    .then(result =>  
      axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${result.data.Key}?apikey=1gAziFvZ0LGxbqOnl1X6GxBww1jHxQAa&language=en-us&details=false`))
      .then(current => 
        this.setState({weatherTemp: current.data[0].Temperature.Imperial.Value}, this.setState({weatherText: current.data[0].WeatherText})));
  };

  getCity = () => {
    axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=1gAziFvZ0LGxbqOnl1X6GxBww1jHxQAa&q=${this.state.latitude},${this.state.longitude}`)
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

  getRestaurants = () => {
    let city = this.state.city
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}+restaurant&maxprice=3&radius=40233&language=en&key=AIzaSyBDsOr5y8ZuU83bfX_Ju2VlKUxbz65Ash8`)
    .then(results => this.setState({restaurantsChoices: results.data.results}))
  };

  getPlaces = () => {
    let city = this.state.city
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${city}+point+of+interest&radius=40233&language=en&key=AIzaSyBDsOr5y8ZuU83bfX_Ju2VlKUxbz65Ash8`)
    .then(results => this.setState({places: results.data.results}))
  }

  isMovie = () => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=b3268089e09ea14487266d14235b7164&language=en-US&page=1&region=us&adult=false`)
    .then(results => 
      this.setState({movieChoices: results.data.results}, 
        this.setState({movieID: results.data.results.map((rest) => rest.id)})));
  };

  getTrailerKey = () => {
    var key = []
    for(let i = 0; i < this.state.movieID.length; i++){
      var id = this.state.movieID[i]
        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b3268089e09ea14487266d14235b7164&language=en-US`)
        .then(results =>
          {
            if(results.data.results[0] !== undefined){key.push(results.data.results[0].key)}
          this.setState({movieTrailerKey: key})}
        );
  };
};

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
        <br></br>
        <br></br>
          <WeatherResults 
            city={this.state.city} 
            currentTemp={this.state.weatherTemp} 
            currentText={this.state.weatherText}
          />
          <br></br>
          <br></br>
            <Grid columns={4} divided>
              <Grid.Row>
                <Grid.Column>
                  <h3>Live Events</h3>
                  <ResultPage results={this.state.musicChoices}/>
                  <ResultPage results={this.state.theaterChoices}/>
                  <ResultPage results={this.state.sportsChoices}/>
                </Grid.Column>
                  <Grid.Column>
                    <h3>Restaurants</h3>
                    <RestaurantsResults results={this.state.restaurantsChoices}/>
                  </Grid.Column>
                    <Grid.Column>
                      <h3>Movies</h3>
                      <MoviePage results={this.state.movieChoices} trailer={this.state.movieTrailerKey}/>
                    </Grid.Column>
                      <Grid.Column>
                        <h3>Sights</h3>
                        <PlacesResults results={this.state.places}/>
                      </Grid.Column>
                </Grid.Row>
              </Grid>
      </div>
    );
  };
};

export default HomePage;
