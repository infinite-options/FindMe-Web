import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
`;
const SomeReactComponent = ({ text }) => {

  return (
      <div>
           <RoomOutlinedIcon 
           fontSize='large'/>
      </div>
  );
};

const GoogleMap = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={{
        key: process.env.REACT_APP_MAP_KEY,
      }}
      {...props}
    >
      {children}
    </GoogleMapReact>
    {/* <GoogleMapReact
                // bootstrapURLKeys={{ key: 'AIzaSyBGgoTWGX2mt4Sp8BDZZntpgxW8Cq7Qq90' }}
                    // center={center}
                    // defaultZoom={this.props.zoom}    
      {...props}
    >
      {children}
      <SomeReactComponent
           lat = {parseFloat(props.latitude) ? parseFloat(props.latitude) : 37.236720}
           lng = {parseFloat(props.longitude)? parseFloat(props.longitude) : -121.887370}
          />
                </GoogleMapReact> */}
  </Wrapper>
);

GoogleMap.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

GoogleMap.defaultProps = {
  children: null,
};

export default GoogleMap;
