import * as React from 'react';
import './Background.css';

export default class Background extends React.Component  {
    public render() {
        return (
            <div className="bg">{this.props.children}</div>
        );
    }

}

