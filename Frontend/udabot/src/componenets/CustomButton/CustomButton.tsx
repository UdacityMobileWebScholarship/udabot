import * as React from 'react';
import {Button} from 'react-bootstrap';

const CustomButton = (props:any) => {
    return (
        <Button>{props.label}</Button>
    );

}

export default CustomButton;