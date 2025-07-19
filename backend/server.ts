import express from "express";
import cors from "cors";
import { encryptValue, initFheInstance } from "./fhevm";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/vote", async (req, res) => {
  try {
    const { vote } = req.body;
    console.log("🗳️ Vote received:", vote);

    const encrypted = encryptValue(Number(vote));
    const hex = "0x" + Buffer.from(encrypted).toString("hex");

    console.log("🔐 Encrypted vote (hex):", hex);
    res.json({ encryptedVote: hex });
  } catch (err) {
    console.error("❌ Vote encryption failed:", err);
    res.status(500).json({ error: "Encryption failed" });
  }
});

initFheInstance()
  .then(() => {
    console.log("🔐 Zama FHE Voting backend is live 🟢");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🌐 Listening on http://0.0.0.0:${PORT}/vote`);
    });
  })
  .catch((err) => {
    console.error("❌ FHE init error:", err);
  });
