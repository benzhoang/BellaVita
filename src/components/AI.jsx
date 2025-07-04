import React, { useState } from 'react';
import '../styles/AI.scss';
import BotIcon from '../images/bot-icon.jpg'; // Đảm bảo bạn đã thêm ảnh này vào thư mục assets

const AI = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="ai-container">
            <div className="bot-button" onClick={toggleChat}>
                <img src={BotIcon} alt="Chatbot" />
            </div>

            {isOpen && (
                <div className="chatbox shadow">
                    <div className="chat-header d-flex justify-content-between align-items-center px-3 py-2">
                        <strong>BellaVita</strong>
                        <button
                            className="btn-close btn-close-white"
                            onClick={toggleChat}
                        ></button>
                    </div>
                    <div className="chat-sidebar px-3 py-2">Tư vấn mỹ phẩm</div>
                    <div className="chat-body px-3 py-2">
                        <div className="chat-message user">Hello</div>
                        <div className="chat-message bot">Hi, how can I help you?</div>
                    </div>
                    <div className="chat-input d-flex align-items-center px-2 py-2">
                        <button className="btn btn-light me-2">+</button>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Type a message..."
                        />
                        <button className="btn btn-dark ms-2">
                            <i className="bi bi-send"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AI;
