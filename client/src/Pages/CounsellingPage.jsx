import { useState } from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const systemMessage = {
    'role': 'system',
    'content': 'You are a relationship counsellor. Act as a therapist and make them feel better.'
}

const CounsellingPage = () => {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm your personal counselor, feel free to talk about your worries.",
            sender: 'counsellor',
            direction: 'incoming'
        }
    ])

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }

        const newMessages = [...messages, newMessage]
        setMessages(newMessages)

        setTyping(true);
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
        // Format messages for chatGPT API
        // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
        // So we need to reformat

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });


        // Get the request body set up with the model we plan to use
        // and the messages which we formatted above. We add a system message in the front to'
        // determine how we want chatGPT to act. 
        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,  // The system message DEFINES the logic of our chatGPT
                ...apiMessages // The messages from our chat with ChatGPT
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + OPENAI_API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: 'counsellor',
                    direction: 'incoming'
                }]);
                setTyping(false);
            });
    }

    return <div style={{ position: 'relative', height: '100vh' }}>
        <MainContainer>
            <ChatContainer>
                <MessageList typingIndicator={typing ? <TypingIndicator content='Thinking....' /> : null}>
                    {messages.map((message, i) => {
                        return <Message key={i} model={message} />
                    })}
                </MessageList>

                <MessageInput placeholder='Type here' onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
    </div>
};

export default CounsellingPage;
