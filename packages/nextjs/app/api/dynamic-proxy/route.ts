import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const token = process.env.DYNAMIC_API_TOKEN;
  const environmentId = process.env.DYNAMIC_ENVIRONMENT_ID;

  console.log("token", token);
  console.log("environmentId", environmentId);
  try {
    const body = await req.json();
    const response = await axios({
      method: 'POST',
      url: `https://app.dynamicauth.com/api/v0/environments/${environmentId}/embeddedWallets`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: body,
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.error('Error in dynamic-proxy:', error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data || { message: 'Internal Server Error' },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }
}