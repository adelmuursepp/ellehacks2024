import React, { useState } from 'react';
// require('dotenv').config();

const GPTCall = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const callGPT = async (prompt) => {
        const API_URL = 'https://api.openai.com/v1/completions';
        const API_KEY = '';
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    prompt: prompt,
                    max_tokens: 50
                })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            return data.choices[0].text;
        } catch (error) {
            console.error('Failed to call GPT:', error);
            throw error;
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const gptResponse = await callGPT(prompt);
            setResponse(gptResponse);
        } catch (error) {
            console.error('Error calling GPT:', error);
            setResponse('Failed to get response.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt"
                />
                <button type="submit">Submit</button>
            </form>
            {response && <p>Response: {response}</p>}
        </div>
    );
};

export default GPTCall;
