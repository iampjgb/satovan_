import './chatcomponent.scss';
import { Chatheads } from './Chatheads';
import { ChatSearchBox } from './ChatSearchBox';
import { RightBarHeader } from './RightBarHeader';
import { RighBarChatBox } from './RighBarChatBox';
import { ChatMessage } from './ChatMessage';

export const ChatComponent = () => {

  return (
    <div className='chat-container'>
      <div className='chat-wrapper'>
        <div className='left-bar'>
              <div className='left-bar-header'>
                {/* nothing.... */}
              </div>
              <ChatSearchBox/>
              <div className='left-bar-chatheads'>
                    <Chatheads/>
              </div>
        </div>
        <div className='right-bar'>
          <RightBarHeader/>
              <div className='right-bar-contents'>
                <ChatMessage/>
                <ChatMessage/>
              </div>
          <RighBarChatBox/>
        </div>
      </div> 
    </div>
    
  )
}
