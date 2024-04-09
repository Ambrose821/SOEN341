import React, { useState, useEffect } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { set } from 'mongoose';


const API_KEY = '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'
function AiChatBot(){

    const [typing,setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {message: "Need car advice? I am your dedicated motor vehicle AI expert, Vini! Ask away!",
        sender:"ai",
        direction: "incoming"
        }       
    ])

    const handleSend = async(message) =>{
        const newMessage ={
            message: message,
            sender:"user",
            direction:'outgoing'

        }

        const newMessages = [...messages, newMessage] //all old messages with new message
        setMessages(newMessages)
        
        await processMessagetoVini(newMessages)
        //After openAi logic
    
    }

    async function processMessagetoVini(someMessages){
        setTyping(true)
        //with @chatscope library. our messages are bascially in the following JSON format {sender : 'user' or 'ai', message: "The message content here", } 
        let apiMessages = someMessages.map((messageObject) =>{
            let role = "";
            if(messageObject.sender === "ai"){
                role = "assistant"
            }else{
                role = "user"
            }
            return{role: role, content: messageObject.message }
        })
        
        
        const systemMessage = {
            role: "system",
            content:  "You are a motor vehicle expert. You will need to answer car and vehicle questions to people who are not well versed in the subject, but they do know how to drive a car.They will be renting not buying. Speak like a car rental agent. Limit the response to a 150 word max and always ask if the user has follow up questions"//"No matter what the user enters, you will respond with the chorus of Rick Astley's song Never gonna give you up. If part of the song is already included, continue a similar sized portion of the song"  "You are a motor vehicle expert. You will need to answer car and vehicle questions to people who are not well versed in the subject, but they do know how to drive a car. Speak like a car salesman."
        }

        //OpenAI api roles "user" -> a message from the app user, "assistant" -> a message from openAI, "System" -> a genreal instruction defining HOW the open AI model should act. Kind of like a pre prompt
        const apiRequestBody = {
            'model': 'gpt-4-1106-preview',
            "messages" :[
                systemMessage,
                ...apiMessages //All the text messages
            ]
        }
        const response = await fetch("https://api.openai.com/v1/chat/completions",{
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        })

        const data = await response.json();
        console.log((data.choices[0].message.content))

        const AiMessage ={
            message: data.choices[0].message.content,
            sender:"ai",
             direction:"incoming"

        }
        const newMessages = [...someMessages, AiMessage]
        setTyping(false)
        setMessages(newMessages)
    }

    return(
        <div className ="App" style ={{position:'relative', display:'flex',textAlign:'center', justifyContent:'center'}} >
            <div style = {{position: "relative", height: "21.2rem", width: "80%"}}>  
            <h4 style ={{marginTop:"0.4rem"}}>AI Vehicle Expert</h4>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={ typing ? <TypingIndicator content="Vini is typing"/> : ""}>
                            {messages.map((message,i) =>{
                                return <Message key ={i} model ={message}/>
                            })}
                        </MessageList>
                        <MessageInput placeholder='Ask Question Here' onSend={handleSend}/>
                    </ChatContainer>
                </MainContainer>
            </div>    
         </div>
    )

}

export default AiChatBot