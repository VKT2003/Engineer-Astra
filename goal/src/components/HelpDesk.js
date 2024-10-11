import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Helpdesk.module.css';
import { HfInference } from '@huggingface/inference';
import Navbar from './Navbar';
import { marked } from 'marked';

const Helpdesk = () => {
    const [query, setQuery] = useState('');
    const [conversation, setConversation] = useState([]);
    const hfInference = new HfInference(process.env.REACT_APP_HUGGINGFACE_API_URL);

    const scrollRef = useRef(null);

    useEffect(()=>{
        scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [conversation]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (query.trim()) {
            // Append the user's message to the conversation
            const userMessage = { sender: 'student', message: query };
            setConversation((prev) => [...prev, userMessage]);

            try {
                // Prepare for the bot's response
                let botResponse = { sender: 'bot', message: '' };

                // Get the AI response from Hugging Face's model
                for await (const chunk of hfInference.chatCompletionStream({
                    model: 'HuggingFaceH4/zephyr-7b-beta',
                    messages: [{ role: 'user', content: query }],
                    max_tokens: 2000,
                })) {
                    const newContent = chunk.choices[0]?.delta?.content || '';
                    botResponse.message += newContent; // Append new content to the bot's message

                    // Update the bot's response dynamically in the conversation
                    setConversation((prev) => {
                        const updated = [...prev];
                        if (updated[updated.length - 1]?.sender === 'bot') {
                            updated[updated.length - 1].message = botResponse.message;
                        } else {
                            updated.push(botResponse);
                        }
                        return updated;
                    });
                }
            } catch (error) {
                console.error('Error fetching response:', error);
            }

            setQuery(''); // Clear the input after submission
        }
    };

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <h1>AI-Powered Student Helpdesk</h1>
                <div className={styles.chatWindow}>
                    {conversation.length === 0 && (
                        <p className={styles.placeholder}>
                            How can we assist you? Ask any question related to college admissions, courses, or subjects.
                        </p>
                    )}
                    {conversation.map((chat, index) => (
                        <div className={`${styles.chat}`} ref={scrollRef}>
                            <img src={`${chat.sender === 'student' ? '/student.png' : '/robot.png'}`} alt="none" className={`${chat.sender === 'student' ? styles.imgStd : styles.imgBot}`} />
                            <div
                                key={index}
                                className={`${styles.message} ${chat.sender === 'student' ? styles.student : styles.bot}`}
                            >
                                {chat.sender === 'bot' ? (
                                    // Use dangerouslySetInnerHTML for the bot message with Markdown support
                                    <p dangerouslySetInnerHTML={{ __html: marked(chat.message) }} />
                                ) : (
                                    // Regular message for the student
                                    <p>{chat.message}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSubmit} className={styles.inputSection}>
                    <input
                        type="text"
                        placeholder="Type your query here..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.input}
                    />
                    <button type="submit" className={styles.sendBtn}>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Helpdesk;
