import React, { Component } from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class TrackMap extends Component {

  state = {
    latestAddress: ''
  }

  componentDidMount () {
    var destination1 = {lat: 48.864  , lng: 2.3525};
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({'location': destination1 }, (results, status)=>{
      if (status === 'OK') {
        if (results[0]) {
          this.setState({
            latestAddress: results[0].formatted_address
          })
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    })
  }
  render() {
    const coords = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 }
    ];
    return (
      <div>
        <p>Latest address: { this.state.latestAddress }</p>
        <div className="d-flex justify-content-center">
          <Map
            google={this.props.google}
            zoom={12}
            className="text-center"
            initialCenter={{
              lat: 42.02,
              lng: -77.01
            }}
          >
            {
              coords.map((coord, index) => {
                return (
                  <Marker
                    key={coord+index}
                    title={'The marker`s title will appear as a tooltip.'}
                    position={{lat: coord.lat, lng: coord.lng}}
                    icon={{
                      url: 'https://chart.googleapis.com/chart?' +
                        'chst=d_map_pin_letter&chld=O|FFFF00|000000'
                    }}
                  />
                )
              })
            }
            {/*<Marker*/}
            {/*position={{lat: 37.759703, lng: -122.428093}}*/}
            {/*icon={{*/}
            {/*url: 'https://chart.googleapis.com/chart?' +*/}
            {/*'chst=d_map_pin_letter&chld=O|FFFF00|000000'*/}
            {/*}}*/}
            {/*/>*/}
            {/*<Marker*/}
            {/*name={'Your position'}*/}
            {/*position={{lat: 37.762391, lng: -122.439192}}*/}
            {/*icon={{*/}
            {/*url: 'https://chart.googleapis.com/chart?' +*/}
            {/*'chst=d_map_pin_letter&chld=D|FF0000|000000',*/}
            {/*}} />*/}
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAKrx6-PFIItXWid8oddWGzvQu_5hkZ-c8')
})(TrackMap)
