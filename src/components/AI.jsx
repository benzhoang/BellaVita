import React, { useState, useRef } from 'react';
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
    const fileInputRef = useRef(null);

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
            const cleanReply = botReply
                .split('\n')
                .map(line => line.replace(/^\*+|\*+$/g, ''))
                .join('\n');
            setMessages([...newMessages, { sender: 'bot', text: cleanReply }]);
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

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Kiểm tra loại file
        if (!file.type.startsWith('image/')) {
            alert('Vui lòng chọn file ảnh!');
            return;
        }

        // Kiểm tra kích thước file (giới hạn 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB.');
            return;
        }

        const newMessages = [...messages, {
            sender: 'user',
            text: 'Đã gửi ảnh',
            image: URL.createObjectURL(file)
        }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('image', file);
            formData.append('prompt', 'Phân tích ảnh mỹ phẩm này');

            const response = await axios.post(
                `${API_URL}/api/ai/chat-image`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const botReply = response.data.reply || 'Xin lỗi, tôi không thể phân tích ảnh này.';
            const cleanReply = botReply
                .split('\n')
                .map(line => line.replace(/^\*+|\*+$/g, ''))
                .join('\n');
            setMessages([...newMessages, { sender: 'bot', text: cleanReply }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([
                ...newMessages,
                { sender: 'bot', text: 'Đã xảy ra lỗi khi phân tích ảnh.' },
            ]);
        } finally {
            setLoading(false);
        }

        // Reset file input
        event.target.value = '';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
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
                                    {msg.image && (
                                        <div className="message-image">
                                            <img src={msg.image} alt="Uploaded" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }} />
                                        </div>
                                    )}
                                    {msg.text && (
                                        <span>
                                            {msg.text.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </span>
                                    )}
                                </div>
                            ))}
                            {loading && <div className="chat-message bot">Đang trả lời...</div>}
                        </div>

                        <div className="chat-input d-flex align-items-center px-2 py-2">
                            <button className="btn btn-light me-2" onClick={triggerFileInput}>
                                <i className="bi bi-image"></i>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
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