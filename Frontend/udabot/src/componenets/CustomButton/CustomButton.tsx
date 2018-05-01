import * as React from 'react';
import {Button} from 'react-bootstrap';

const CustomButton = (props:any) => {
    return (
        <div>
        <Button>{props.label}</Button>
        </div>
    );

}

export default CustomButton;