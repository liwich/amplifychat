import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listChatMessages } from '../graphql/queries'
import { createChatMessage } from '../graphql/mutations';
import { onCreateChatMessage } from '../graphql/subscriptions';

import './Chat.css'


function Chat({ stateUser }) {

    const [stateMessages, setStateMessages] = useState([]);
    const [stateMessage, setStateMessage] = useState("");

    useEffect(() => {

        let getChatMessages = async () => {
            let queryResponse = await API.graphql({
                query: listChatMessages
            });

            var mapped = queryResponse.data.listChatMessages.items.map(x => {
                x.isMine = x.chatMessageUsersId === stateUser?.id;
                return x;
            })

            setStateMessages(mapped.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));

        }

        getChatMessages();

        let subscription = API.graphql(graphqlOperation(onCreateChatMessage))
            .subscribe({
                next: ({ provider, value }) => {
                    value.data.onCreateChatMessage.isMine = value.data.onCreateChatMessage.chatMessageUsersId === stateUser.id;
                    setStateMessages((stateMessages) => [
                        value.data.onCreateChatMessage,
                        ...stateMessages,
                    ]);
                },
                error: (error) => console.warn(error),
            });

        return () => {
            console.log("Desmontando mi componente");
            subscription.unsubscribe();
        }
    }, [stateUser])

    const sendMessage = async (e) => {
        e.preventDefault();
        await API.graphql({
            query: createChatMessage,
            variables: {
                input: {
                    "message": stateMessage,
                    "chatMessageUsersId": stateUser.id
                }
            }
        });
        e.target.reset();
    }

    const messageChange = (e) => {
        setStateMessage(e.target.value);
    }

    return (
        <form className='pt-5' onSubmit={sendMessage}>
            <h3>Amplify Chat Room</h3>

            <div id='chat' className="form-control mb-3" style={{ height: '80vh' }}>
                {stateMessages.map((message, index) => (
                    <div key={message.id}
                        className={
                            message.isMine ? 'sentMessageContainer' : 'receivedMessageContainer'
                        }
                    >
                        <p>{message.sender}</p>
                        <div className={message.isMine ? 'sentMessage' : 'receivedMessage'}>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-group mb-3">
                <input onChange={messageChange} type="text" className="form-control" placeholder="Escribe un mensaje" />
                <button className='btn btn-success input-group-text'>Send</button>
            </div>
        </form>
    );
}

export default Chat;