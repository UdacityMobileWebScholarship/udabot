import * as React from 'react';
import {Button} from 'react-bootstrap';
import './CustomButton.css';

const CustomButton = (props:any) => {
    return (
        <Button>{props.label}</Button>
    );

}

export default CustomButton;