import { createWalletClient, custom, parseUnits, encodeFunctionData } from "viem";
import { base } from "viem/chains";
import { sdk } from "@farcaster/miniapp-sdk";

// USDC on Base (native, 6 decimals)
export const USDC_BASE_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

const ERC20_TRANSFER_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

/**
 * Sends `amountUsdc` (e.g. "1" or "0.5") of USDC on Base from the visitor's
 * Farcaster wallet to `toAddress`. Gas + the USDC amount are paid entirely
 * by the visitor's wallet — this app never holds or fronts any funds.
 */
export async function sendUsdcTip(toAddress: `0x${string}`, amountUsdc: string) {
  const provider = await sdk.wallet.getEthereumProvider();
  if (!provider) {
    throw new Error("No wallet available. Open this app inside Farcaster to tip.");
  }

  const walletClient = createWalletClient({
    chain: base,
    transport: custom(provider),
  });

  const [account] = await walletClient.requestAddresses();

  const data = encodeFunctionData({
    abi: ERC20_TRANSFER_ABI,
    functionName: "transfer",
    args: [toAddress, parseUnits(amountUsdc, 6)],
  });

  const txHash = await walletClient.sendTransaction({
    account,
    to: USDC_BASE_ADDRESS,
    data,
    chain: base,
  });

  return txHash;
}
