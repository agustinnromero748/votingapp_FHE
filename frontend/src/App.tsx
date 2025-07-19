import { useState } from "react";
import { ethers } from "ethers";
import ABI from "../contracts/PrivateVoting.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS!;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL!;

export default function App() {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleVote = async (vote: number) => {
    try {
      setDisabled(true);
      setStatus("🔐 Encrypting your vote...");

      const res = await fetch(`${BACKEND_URL}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vote }),
      });

      const { encryptedVote } = await res.json();

      setStatus("📤 Sending transaction to the blockchain...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);

      const tx = await contract.vote(encryptedVote);
      await tx.wait();

      setStatus("✅ Success!");
      setMessage("🎉 Your vote has been recorded privately and securely.");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
      setMessage("");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🗳️ Zama Private Voting dApp</h1>

      <button
        disabled={disabled}
        onClick={() => handleVote(1)}
        style={{ padding: "0.5rem 1rem", marginRight: "1rem" }}
      >
        ✅ Vote YES
      </button>

      <button
        disabled={disabled}
        onClick={() => handleVote(0)}
        style={{ padding: "0.5rem 1rem" }}
      >
        ❌ Vote NO
      </button>

      <p>{status}</p>
      <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}
