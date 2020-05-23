import React from "react";
import Home from "../Home/Home";
import Signin from "../../components/Signin/Signin";
import Register from "../../components/Register/Register";

const Decision = (props) => {
    const {
        route,
        onInputChange,
        onButtonSubmit,
        imageURL,
        box,
        onRouteChange,
        user
    } = props;
    if(route === "home"){
        return(
            <Home 
				onInputChange={onInputChange}
				onSubmit={onButtonSubmit}
				imageURL={imageURL}
                box={box}
                user={user}
			/>
        );
    } else if(route === "signin"){
        return(
            <Signin onRouteChange={onRouteChange}/>
        );
    } else {
        return(
            <Register onRouteChange={onRouteChange}/>
        );
    }
}

export default Decision