// app/api/prices/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const apiKey = process.env.FREE_CURRENCY_API_KEY;
    const response = await axios.get(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=USD&base_currency=MXN`,
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch USD/MXN prices");
    }

    const data = response.data;

    // return new Response(JSON.stringify(newCharacter), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    return NextResponse.json({ mxnUsd: data.data.USD });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
