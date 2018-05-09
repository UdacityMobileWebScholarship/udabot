import * as React from 'react';
import './CustomButton.css';

const CustomButton = (props:any) => {
    return (
        <button>{props.label}</button>
    );

}

export default CustomButton;