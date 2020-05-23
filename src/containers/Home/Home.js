import React from "react";
import Logo from "../../components/Logo/Logo";
import Rank from "../../components/Rank/Rank";
import ImageLinkForm from "../../components/Image Link Form/ImageLinkForm";
import FaceRecognition from "../../components/Face Recognition/FaceRecognition";

const Home = ({onInputChange, onSubmit, imageURL, box, user}) => {
    return(
        <div>
            <Logo />
			<Rank 
				name={user.name}
				entries={user.entries}
			/>
			<ImageLinkForm 
				onInputChange={onInputChange} 
				onSubmit={onSubmit}
			/>
			<FaceRecognition 
				imageURL={imageURL}
				box={box}
			/>
        </div>
    );
}

export default Home;