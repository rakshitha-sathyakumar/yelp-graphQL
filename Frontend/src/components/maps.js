// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//   width: '100%',
//   height: '70%'
// };

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={5}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: 48.85837009999999,
//             lng: 2.2944813
//           }
//         }
//       />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyDbhKxcXXJaBcKSg6-Hjvb6BeaHQjSuZYc'
// })(MapContainer);


import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

const mapStyles = {
    width: '100%',
    height: '70%'
  };

Geocode.setApiKey("AIzaSyDbhKxcXXJaBcKSg6-Hjvb6BeaHQjSuZYc");

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  } 

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    data: []
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        style={mapStyles}
        initialCenter={
        {
            lat: 37.336781,
            lng: -121.876350
          }
        }
      >
      <Marker
          position={{lat: 37.336781, lng: -121.876350}}
          name={'House of Bagels'}
        />

        <Marker
          position={{lat: 37.704491, lng: -121.866089}}
          name={'The Banana Garden'}
        />
        <Marker
          position={{lat: 37.703380, lng: -121.850950}}
          name={'Gum Kuo'}
        />

        <Marker
          position={{lat: 37.699900, lng: -121.868860}}
          name={'Eathai'}
        />  
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDbhKxcXXJaBcKSg6-Hjvb6BeaHQjSuZYc'
})(MapContainer);
