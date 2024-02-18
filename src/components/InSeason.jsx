import React, { useState } from "react";
import "./ShowRecipe.css";

const InSeason = (props) => {
  const [response, setResponse] = useState("");

  const fruitsData = {
    oranges: {
      months: ["December", "January", "February", "March", "April"],
      emoji: "🍊",
    },
    grapefruits: {
      months: ["December", "January", "February", "March", "April"],
      emoji: "🍊",
    },
    pomegranates: {
      months: ["October", "November", "December", "January", "February"],
      emoji: "🍑",
    },
    persimmons: {
      months: ["November", "December", "January", "February"],
      emoji: "🍑",
    },
    kiwis: {
      months: ["November", "December", "January", "February", "March"],
      emoji: "🥝",
    },
    lemons: {
      months: ["November", "December", "January", "February", "March"],
      emoji: "🍋",
    },
    mandarins: {
      months: ["November", "December", "January", "February"],
      emoji: "🍊",
    },
    grapes: { months: ["October", "November", "December"], emoji: "🍇" },
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>
        In season in winter 📅
      </h2>
      <div>
        {Object.entries(fruitsData).map(([fruit, data]) => (
          <div
            key={fruit}
            style={{
              margin: "20px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h3>
              {data.emoji} {fruit.charAt(0).toUpperCase() + fruit.slice(1)}
            </h3>
            <p>Season: {data.months.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InSeason;
