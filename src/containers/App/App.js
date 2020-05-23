import React, { Component } from 'react';
import './App.css';
import "tachyons";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "../../components/Navigation/Navigation";
import Decision from "../Decision/Decision";

/**
 * Face to use:
 * https://kottke.org/plus/misc/images/ai-faces-01.jpg
 * https://www.byrdie.com/thmb/KBAMcu_2pI2Xd9BDQ_ft9qvZKMg=/1200x900/filters:fill(auto,1)/promo-f479f33fd9304b3997cc0f7c97c1a245.jpg
 * https://mod.fnal.gov/mod/stillphotos/2018/0200/18-0244-28.jpg
 */

const app = new Clarifai.App({
	apiKey: '4dabde3c0f224ccabfbebf3f9c240d6f'
   });

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 200
			}
		}
	}
}

class App extends Component {
	constructor(){
		super();
		this.state = {
			input: "",
			imageURL: "",
			box: {},
			route: "signin",
			isSignedIn: false,
			user: {
				id: "000",
				name: "User",
				email: "user@email.com",
				entries: 0,
				joined: ""
			}
		}
	}

	loadUser = (data) => {
		this.setState({user: {
		  id: data.id,
		  name: data.name,
		  email: data.email,
		  entries: data.entries,
		  joined: data.joined
		}})
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputImage");
		const width = +image.width;
		const height = +image.height;
		return {
			leftCol: clarifaiFace.left_col * width,
			rightCol: width - (clarifaiFace.right_col * width),
			topRow: clarifaiFace.top_row * height,
			bottomRow: height - (clarifaiFace.bottom_row * height)
		};
	}
	
	displayFaceBox = (box) => {
		console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onButtonSubmit = (event) => {
		this.setState({imageURL: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}

	onRouteChange = (route) => {
		if(route === "signout"){
			this.setState({isSignedIn: false});
		}else if(route === "home"){
			this.setState({isSignedIn: true});
		}
		this.setState({route: route});
	}

	render() {
		const {isSignedIn, imageURL, route, box, user} = this.state;
		return (
			<div className="App">
				<Particles 
					params={particlesOptions}
					className="particles" 
				/>
				<Navigation 
					isSignedIn={isSignedIn} 
					onRouteChange={this.onRouteChange}
				/>
				<Decision 
					route={route}
					onInputChange={this.onInputChange}
					onButtonSubmit={this.onButtonSubmit}
					imageURL={imageURL}
					box={box}
					onRouteChange={this.onRouteChange}
					user={user}
				/>
			</div>
		);
	}
}

export default App;
