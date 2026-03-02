// Notch.jsx
import React, { useState } from 'react';
import './Notch.css';  // استيراد ملف الـ CSS الخاص بـ notch

const Notch = () => {
    const [showChat, setShowChat] = useState(false);

    const toggleChat = () => {
        setShowChat(!showChat);  // تغيير حالة الـ chat عند الضغط
    };

    return (
        <div>
            {/* الـ Notch المستطيلة */}
            <div className="notch" onClick={toggleChat}>
                <div className="notch-icon">
                    {/* أيقونة الـ chatbot */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14l4-4h10l4 4V10z"></path>
                    </svg>
                </div>
            </div>

            {/* عندما يتم تفعيل chat */}
            {showChat && (
                <div className="chat-box">
                    <div className="chat-header">
                        <div className="chat-title">
                            <h3>GamerBot</h3>
                            <span className="status">En ligne</span>
                        </div>
                        <div className="close-chat" onClick={toggleChat}>X</div>
                    </div>
                    <div className="chat-messages">
                        <div className="message bot">
                            <p>Hey Gamer! 👋 Je suis GamerBot, ton assistant virtuel. Pose-moi des questions sur nos produits, prix, livraison... Je suis là pour t'aider !</p>
                        </div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Tape ton message..." />
                        <button className='chat-input-button'>Envoyer</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notch;
