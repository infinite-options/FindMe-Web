import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

const SomeReactComponent = ({ text }) => {

  return (
      <div>
           <RoomOutlinedIcon 
           fontSize='large'/>
      </div>
  );
};


export default class MapComponent extends Component {

    static defaultProps = {
        center: {
            lat: 37.236720,
            lng: -121.887370
        },
        zoom: 14
    };

  render() {
    const center = {lat:parseFloat(this.props.latitude) ? parseFloat(this.props.latitude) : 37.236720, lng: parseFloat(this.props.longitude)? parseFloat(this.props.longitude) : -121.887370}

        return (
          
            <div style={{ height: '30%', width:'90%'}}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY, libraries:['places'] }}
                    center={center}
                    defaultZoom={this.props.zoom}                      
                >

          <SomeReactComponent
           lat = {parseFloat(this.props.latitude) ? parseFloat(this.props.latitude) : 37.236720}
           lng = {parseFloat(this.props.longitude)? parseFloat(this.props.longitude) : -121.887370}
          />
           </GoogleMapReact>
      </div>
    )
  }
}