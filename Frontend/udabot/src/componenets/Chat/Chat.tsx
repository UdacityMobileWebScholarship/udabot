import * as React from 'react';
import './Chat.css';
import  * as BotChat from "botframework-webchat";

class Chat extends React.Component {
  private params = BotChat.queryParams(location.search);
  public render() {
    return (
      
      <div className="App">
        
        <div className="App-intro">
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
        </div>
      </div>
    );
  }
}

export default Chat;