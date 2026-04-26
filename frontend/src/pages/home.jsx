import { useEffect, useState } from "react";
import { getPolls } from "../api/pollApi";
import PollCard from "../components/PollCard";
import CreatePoll from "../components/CreatePoll";

export default function Home() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const data = await getPolls();
      setPolls(data);
    } catch {
      setError("Could not load polls. Is the backend running on port 3000?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  // prepend new poll to top
  const handleCreated = (newPoll) => {
    setPolls((prev) => [newPoll, ...prev]);
  };

  // replace updated poll in list (after vote)
  const handlePollUpdate = (updatedPoll) => {
    setPolls((prev) =>
      prev.map((p) => (p._id === updatedPoll._id ? updatedPoll : p)),
    );
  };

  // remove deleted poll from list
  const handlePollDelete = (deletedId) => {
    setPolls((prev) => prev.filter((p) => p._id !== deletedId));
  };

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 24 }}> let's Poll</h1>

      <CreatePoll onCreated={handleCreated} />

      {loading && <p style={{ color: "#888" }}>Loading polls...</p>}

      {error && (
        <div
          style={{
            background: "#ffeaea",
            border: "1px solid #f99",
            borderRadius: 6,
            padding: 12,
            color: "#c00",
          }}
        >
          {error}
        </div>
      )}

      {!loading && !error && polls.length === 0 && (
        <p style={{ color: "#888", textAlign: "center", padding: "40px 0" }}>
          no poll is been created till now .... create one
        </p>
      )}

      {polls.map((p) => (
        <PollCard
          key={p._id}
          poll={p}
          onUpdate={handlePollUpdate}
          onDelete={handlePollDelete}
        />
      ))}
    </div>
  );
}
