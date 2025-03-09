import React from "react";

function SummaryCard({ text, number }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", borderRadius: "8px", textAlign: "center" }}>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>{text}</p>
      <p style={{ fontSize: "24px", color: "#007BFF", margin: "0" }}>{number}</p>
    </div>
  );
}

export default SummaryCard;
