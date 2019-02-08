import React from 'react'
import { Grid} from 'semantic-ui-react'

const DateType = (props) => (
    <div className='selections'>
        <header className='App-header'>
          <h1>
            Date Knight
          </h1>
        </header>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            <Grid divided='vertically'>
              <Grid.Row centered columns={8}>
                <Grid.Column>
                  <h3>Select One</h3>
                </Grid.Column>
              </Grid.Row>
                  <Grid.Row centered columns={8}>
                    <Grid.Column>
                      <button className="music fas fa-music" name="music" onClick={(event) => props.selectedEvent(event)}></button>
                      <p>Live Music</p>
                    </Grid.Column>
                      <Grid.Column>
                        <button className="theater fas fa-theater-masks" name="theater" onClick={(event) => props.selectedEvent(event)}></button>
                        <p>Theater</p>
                      </Grid.Column>
                        <Grid.Column>
                          <button className="sports fas fa-football-ball" name="sports" onClick={(event) => props.selectedEvent(event)}></button>
                          <p>Sports</p>
                        </Grid.Column>
                </Grid.Row>
                  <Grid.Row centered columns={8}>
                    <Grid.Column>
                      <button onClick={() => props.handleSubmit() }>Submit</button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered columns={8}>
                    <Grid.Column>
                      {props.history.map((results, i) => 
                        console.log(results))}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
    </div>
);

export default DateType