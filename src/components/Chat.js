import React, { Component } from 'react'; 

const messages = [
    { text: 'Hello', isMine: true },
    { text: 'Hi there', isMine: false },
    { text: 'Hello', isMine: true },
    { text: 'Hi there', isMine: false },
    { text: 'Hello', isMine: true }
];

function Chat() {
    return (
        <React.Fragment>
            <h3>Titulo del chat</h3>

            <div id='chat' className="form-control mb-3" style={{ height: '80vh' }}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.isMine ? 'mine' : 'theirs'}`}>
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Escribe un mensaje" />
                <button className='btn btn-success input-group-text'><i className='bi bi-send-fill'></i></button>
            </div>
        </React.Fragment>
    );
}

export default Chat;