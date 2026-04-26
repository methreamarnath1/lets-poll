import { useState } from "react";
import { createPoll } from "../api/pollApi";

export default function CreatePoll({ onCreated }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateOption = (i, val) => {
    const updated = [...options];
    updated[i] = val;
    setOptions(updated);
  };

  const addOption = () => {
    if (options.length < 4) setOptions([...options, ""]);
  };

  const removeOption = (i) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, idx) => idx !== i));
  };

  const handleCreate = async () => {
    setError("");

    // ── Validation ──
    if (!question.trim()) {
      return setError("Question is required.");
    }

    const filled = options.filter((o) => o.trim() !== "");
    if (filled.length < 2) {
      return setError("At least 2 options are required.");
    }

    setLoading(true);
    try {
      const newPoll = await createPoll({
        question: question.trim(),
        options: filled, 
      });

      // reset form
      setQuestion("");
      setOptions(["", ""]);

      onCreated(newPoll);  
      setError(
        err.response?.data?.error || err.message || "Failed to create poll.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        marginBottom: 24,
        background: "#f9f9f9",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Create Poll</h3>

      {/* Error */}
      {error && (
        <div
          style={{
            background: "#ffeaea",
            border: "1px solid #f99",
            borderRadius: 6,
            padding: "8px 12px",
            marginBottom: 12,
            color: "#c00",
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {/* Question */}
      <input
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: 12,
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid #ddd",
          fontSize: 14,
        }}
        maxLength={200}
      />

      {/* Options */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 10,
        }}
      >
        {options.map((opt, i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <input
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => updateOption(i, e.target.value)}
              style={{
                flex: 1,
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #ddd",
                fontSize: 14,
              }}
              maxLength={100}
            />
            {/* Remove button — only when more than 2 options */}
            {options.length > 2 && (
              <button
                onClick={() => removeOption(i)}
                style={{
                  background: "transparent",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "0 10px",
                  color: "#c00",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add option — disabled at 4 */}
      <button
        onClick={addOption}
        disabled={options.length >= 4}
        style={{
          marginBottom: 14,
          background: "transparent",
          border: "1px dashed #aaa",
          borderRadius: 6,
          padding: "6px 14px",
          cursor: options.length >= 4 ? "not-allowed" : "pointer",
          color: "#555",
          fontSize: 13,
        }}
      >
        + Add Option {options.length >= 4 ? "(max 4)" : ""}
      </button>

      {/* Submit */}
      <div>
        <button
          onClick={handleCreate}
          disabled={loading}
          style={{
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "10px 22px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </div>
    </div>
  );
}
