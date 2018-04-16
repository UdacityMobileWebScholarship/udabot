import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './componenets/App/App';
import './index.css';
import 'botframework-webchat/botchat.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
