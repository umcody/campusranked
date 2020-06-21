import React from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class mapComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Map
                google= {this.props.google}
                zoom={14}
                style={{ width: "100%", height: "100px" }}
                initialCenter={{
                    lat: 43.0766,
                    lng:  -89.412500
                }}
            />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyBlad-iC0yCOR8ShH79GpwCVadBEaFYzjw"
})(mapComponent);