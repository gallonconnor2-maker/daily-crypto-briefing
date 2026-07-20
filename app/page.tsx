"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { getTodayQuestion } from "@/lib/questions";
import { sendUsdcTip } from "@/lib/tip";

// Set this to the wallet address that should receive tips — this is where
// your revenue actually lands. Swap in your own address before deploying.
const CREATOR_ADDRESS = (process.env.NEXT_PUBLIC_CREATOR_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

const TIP_OPTIONS = ["1", "5", "10"];

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success"; hash: string }
  | { state: "error"; message: string };

export default function Home() {
  const question = getTodayQuestion();
  const [selectedAmount, setSelectedAmount] = useState(TIP_OPTIONS[0]);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  useEffect(() => {
    // Tells the Farcaster client the app is ready to be displayed.
    // Without this call users get stuck on a loading screen.
    sdk.actions.ready();
  }, []);

  const handleTip = async () => {
    if (CREATOR_ADDRESS === "0x0000000000000000000000000000000000000000") {
      setStatus({
        state: "error",
        message: "Set NEXT_PUBLIC_CREATOR_ADDRESS to your wallet address before going live.",
      });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const hash = await sendUsdcTip(CREATOR_ADDRESS, selectedAmount);
      setStatus({ state: "success", hash });
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Tip failed. Try again.",
      });
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="page">
      <div className="masthead">
        <span>Daily Crypto Briefing</span>
        <span className="id">
          No. {question.id.toString().padStart(3, "0")} — {today}
        </span>
      </div>

      <div className="card">
        <span className="tag">{question.tag}</span>
        <p className="prompt">{question.prompt}</p>

        <hr className="divider" />

        <div className="tip-label">Tip the briefing (USDC on Base)</div>
        <div className="tip-row">
          {TIP_OPTIONS.map((amount) => (
            <button
              key={amount}
              className={`tip-amount ${selectedAmount === amount ? "selected" : ""}`}
              onClick={() => setSelectedAmount(amount)}
            >
              ${amount}
            </button>
          ))}
        </div>

        <button
          className="tip-button"
          onClick={handleTip}
          disabled={status.state === "sending"}
        >
          {status.state === "sending" ? "Confirm in wallet…" : `Send $${selectedAmount} tip`}
        </button>

        {status.state === "success" && (
          <div className="status ok">
            Tip sent. Tx: {status.hash.slice(0, 10)}…{status.hash.slice(-6)}
          </div>
        )}
        {status.state === "error" && <div className="status err">{status.message}</div>}
      </div>

      <p className="footer-note">
        Reply with your take in the cast. Tips go directly to the creator wallet —
        gas and the tip amount are paid by you, the sender, from your own
        Farcaster wallet.
      </p>
    </main>
  );
}
