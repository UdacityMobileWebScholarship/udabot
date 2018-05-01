import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Chat from './componenets/Chat/Chat';
import Landing from './componenets/Landing/Landing';
import 'botframework-webchat/botchat.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    	<div>
    		<Switch>
    			<Route path="/Chat" component={ Chat } />
    			<Route path="/" component={ Landing } />
			</Switch>
    	</div>
    </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
