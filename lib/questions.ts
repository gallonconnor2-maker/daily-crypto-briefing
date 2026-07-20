export type Question = {
  id: number;
  prompt: string;
  tag: string;
};

// Keep this list growing — add new entries at the bottom so the rotation
// order (and therefore each day's question) stays stable for past days.
export const QUESTIONS: Question[] = [
  { id: 1, tag: "Markets", prompt: "What's the one trade you're most confident in this week — and why?" },
  { id: 2, tag: "Hot take", prompt: "Which L2 do you think is most overrated right now?" },
  { id: 3, tag: "Portfolio", prompt: "If you had to go 100% into one asset for a year, what would it be?" },
  { id: 4, tag: "Culture", prompt: "What's a crypto opinion you hold that would get you ratio'd here?" },
  { id: 5, tag: "Builders", prompt: "What's the most useful onchain app you've used this month?" },
  { id: 6, tag: "Markets", prompt: "Bull or bear for the next 30 days — and what's your evidence?" },
  { id: 7, tag: "Memecoins", prompt: "Best memecoin call you've made — or the worst?" },
  { id: 8, tag: "Security", prompt: "What's one security habit that's saved you from getting rekt?" },
  { id: 9, tag: "Hot take", prompt: "Is there a chain you think won't exist in 3 years?" },
  { id: 10, tag: "Builders", prompt: "What's missing from crypto right now that someone should just build?" },
  { id: 11, tag: "Markets", prompt: "What's your realistic BTC price target for year-end?" },
  { id: 12, tag: "Culture", prompt: "What got you into crypto in the first place?" },
  { id: 13, tag: "Portfolio", prompt: "What's the worst-performing thing in your bag right now?" },
  { id: 14, tag: "DeFi", prompt: "Which DeFi protocol do you trust the most with your own money?" },
  { id: 15, tag: "Hot take", prompt: "Do you think most tokens launched this year will be worth zero in 12 months?" },
  { id: 16, tag: "Markets", prompt: "What's a signal you watch that most people ignore?" },
  { id: 17, tag: "Culture", prompt: "What's the most overhyped narrative in crypto right now?" },
  { id: 18, tag: "Builders", prompt: "What would make you actually use an app daily instead of just trying it once?" },
  { id: 19, tag: "Portfolio", prompt: "How much of your net worth is in crypto — comfortable or too much?" },
  { id: 20, tag: "Markets", prompt: "What's the next sector you think has a real run left in it?" },
];

const DAY_MS = 24 * 60 * 60 * 1000;
// Fixed anchor date so "today's question" is stable and identical for every
// visitor and doesn't depend on server timezone quirks.
const EPOCH = Date.UTC(2026, 0, 1); // Jan 1, 2026 UTC

export function getTodayQuestion(date: Date = new Date()): Question {
  const daysSinceEpoch = Math.floor((Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ) - EPOCH) / DAY_MS);

  const index = ((daysSinceEpoch % QUESTIONS.length) + QUESTIONS.length) % QUESTIONS.length;
  return QUESTIONS[index];
}
