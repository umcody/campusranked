import React, { useEffect } from 'react';
import {Helmet} from "react-helmet"

export default () => {
    
    return (
        <div className="onePage">
            <div className = "center" style = {{top:"30%"}}>
                <h1>We are students</h1>
                <h4>Studying in Madison, Wisconsin</h4>
                <h5 style={{ marginTop: "50px" }}>There isn't anything that special about us</h5>
                <h5>We are simply trying to help you make the best out of your college life</h5>
                <div style = {{marginTop : "20px", fontWeight : "200"}}>If you have any questions or inquiries, contact us through campusranked@gmail.com</div>
            </div>
            <Helmet>
                <title>About Us</title>
                <meta name = "description"
                    content = "We are simply trying to help you make the best out of your college life"/>
            </Helmet>
        </div>
    )
}