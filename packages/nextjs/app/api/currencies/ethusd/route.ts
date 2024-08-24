// app/api/prices/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const apiKey = process.env.COINGECKO_API_KEY;
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    const headers = {
      "Content-Type": "application/json",
      "X-CMC_PRO_API_KEY": apiKey,
    };
    const response = await axios.get(url, { headers });

    if (response.status !== 200) {
      throw new Error("Failed to fetch ETH/USD prices");
    }
    const data = response.data;
    return NextResponse.json({ ethusd: data.ethereum.usd });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
