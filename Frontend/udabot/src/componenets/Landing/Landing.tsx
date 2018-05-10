import * as React from 'react';
import {Link} from 'react-router-dom';
import CustomButton from '../CustomButton/CustomButton';
import Background from '../Background/Background';
import './Landing.css';

class Landing extends React.Component {
    public render() {
        return (
            <Background>
                <div className="wrapper">
                    <div className="heading-font">
                        <p className="big">Hi! <br/>
                        Welcome To Udacity PathFinder</p>
                        <p className="small">We help you find the best track for your interest <br/>
                        Tap the button below to start chatting</p>
                    </div>
                    <Link to="/chat"><CustomButton label='Start Chatting'/></Link>
                </div>
            </Background>
        );
    }
}

export default Landing;