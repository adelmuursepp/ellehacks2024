import React, { useState } from "react";
import "./ShowRecipe.css";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const ShowRecipe = (props) => {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const processMessageToChatGPT = async () => {
    console.log(props.product);

    const message_content =
      "I am asking you for a recipe with this ingredient " + props.product;
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: message_content }],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    const response_str = await response.json();
    // const response_str = JSON.stringify(response_new);
    console.log(response_str);
    if (
      response_str &&
      response_str.choices &&
      response_str.choices.length > 0
    ) {
      const recipe = response_str.choices[0].message.content;
      setResponse(recipe);
    }
  };

  const buttonStyle = {
    margin: "auto",
    fontSize: "16px",
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // A pleasant green
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <button style={buttonStyle} onClick={processMessageToChatGPT}>
          Generate a Recipe
        </button>
      </div>
      <p className="recipe-box">{response}</p>
    </div>
  );
};
export default ShowRecipe;
