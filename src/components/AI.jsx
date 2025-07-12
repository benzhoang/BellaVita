import React, { useState } from 'react';
import '../styles/AI.scss';
import BotIcon from '../images/bot-icon.jpg';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Xin chào! Tôi có thể tư vấn mỹ phẩm cho bạn.' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: 'user', text: input }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/api/ai/chat`,
                { prompt: input },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const botReply = response.data.reply || 'Xin lỗi, tôi chưa hiểu.';
            setMessages([...newMessages, { sender: 'bot', text: botReply }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([
                ...newMessages,
                { sender: 'bot', text: 'Đã xảy ra lỗi khi kết nối với AI.' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="ai-container">
            <div className="ai-content">
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
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${msg.sender}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {loading && <div className="chat-message bot">Đang trả lời...</div>}
                        </div>

                        <div className="chat-input d-flex align-items-center px-2 py-2">
                            <button className="btn btn-light me-2">+</button>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nhập tin nhắn..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <button className="btn btn-dark ms-2" onClick={handleSend}>
                                <i className="bi bi-send"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AI;