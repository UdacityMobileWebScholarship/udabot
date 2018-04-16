import * as React from 'react';
import './App.css';
import  * as BotChat from "botframework-webchat"

class App extends React.Component {
  private params = BotChat.queryParams(location.search);
  public render() {
    return (
      <div className="App">
        
        <p className="App-intro">
        <BotChat.Chat
          adaptiveCardsHostConfig=''
          user={{
            id: this.params.userid || 'userid',
            name: this.params.username || 'User'
          }}
          bot={{
            id:this.params.botid || 'botid',
            name: 'UdaBot'
          }}
          directLine={{
            domain: this.params.domain,
            secret: 'IFs5Uv9sVEA.cwA.3yc.EksIqzeTE-FRUMLq_eaCM_k5Jgw0ysglCCMv9g2yAE4',
            token: this.params.t      
          }} 
          resize='detect'         
        />
        </p>
      </div>
    );
  }
}

export default App;