import { useState } from "react";
import { votePoll, deletePoll } from "../api/pollApi";

export default function PollCard({ poll, onUpdate, onDelete }) {
  //check does the user voted or not
  const [hasVoted, setHasVoted] = useState(
    !!localStorage.getItem(`voted_${poll._id}`),
  );

  const [currentPoll, setCurrentPoll] = useState(poll);

  const normalizedOptions = currentPoll.options.map((opt, idx) => ({
    text: typeof opt === "string" ? opt : (opt.text ?? ""),
    votes:
      typeof opt === "object" && typeof opt.votes === "number" ? opt.votes : 0,
    _id:
      opt && typeof opt === "object" && opt._id
        ? opt._id
        : `${currentPoll._id}_${idx}`,
  }));

  const totalVotes = normalizedOptions.reduce((sum, o) => sum + o.votes, 0);
  const maxVotes = Math.max(0, ...normalizedOptions.map((o) => o.votes));

  //Vote is handiled
  const handleVote = async (i) => {
    if (hasVoted) return;

    try {
      const updated = await votePoll(currentPoll._id, i);

      setCurrentPoll(updated);
      setHasVoted(true);

      onUpdate(updated);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this poll?")) return;

    try {
      await deletePoll(currentPoll._id);
      onDelete(currentPoll._id);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        background: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <h3 style={{ margin: 0, flex: 1 }}>{currentPoll.question}</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 12, color: "#888" }}>
            {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
          </span>
          <button
            onClick={handleDelete}
            title="Delete poll"
            style={{
              background: "transparent",
              border: "1px solid #fcc",
              borderRadius: 6,
              color: "#c33",
              cursor: "pointer",
              padding: "4px 8px",
              fontSize: 13,
            }}
          >
            🗑 Delete
          </button>
        </div>
      </div>

      {!hasVoted && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {normalizedOptions.map((opt, i) => (
            <button
              key={opt._id}
              onClick={() => handleVote(i)}
              style={{
                padding: "10px 14px",
                textAlign: "left",
                background: "#f5f5f5",
                border: "1px solid #ddd",
                borderRadius: 6,
                cursor: "pointer",
                fontSize: 14,
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {/* After voting  result bar is showen  */}
      {hasVoted && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {normalizedOptions.map((opt, i) => {
            const pct =
              totalVotes === 0 ? 0 : Math.round((opt.votes / totalVotes) * 100);
            const isWinner = opt.votes === maxVotes && maxVotes > 0;

            return (
              <div key={opt._id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 5,
                    fontSize: 14,
                  }}
                >
                  <span>
                    {opt.text}
                    {isWinner && <span style={{ marginLeft: 6 }}>LEED</span>}
                  </span>
                  <span style={{ color: "#555", fontWeight: "bold" }}>
                    {pct}% · {opt.votes} vote{opt.votes !== 1 ? "s" : ""}
                  </span>
                </div>
                <div
                  style={{
                    background: "#eee",
                    borderRadius: 99,
                    height: 10,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      borderRadius: 99,
                      background: isWinner ? "#f0b429" : "#4caf50",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}

          <div style={{ textAlign: "right", fontSize: 12, color: "#aaa" }}>
            Total: {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
          </div>
        </div>
      )}
    </div>
  );
}
