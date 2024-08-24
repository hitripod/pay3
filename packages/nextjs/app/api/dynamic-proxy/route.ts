import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const token = process.env.DYNAMIC_API_TOKEN;
  const environmentId = process.env.DYNAMIC_ENVIRONMENT_ID;

  try {
    const body = await req.json();
    const { method, endpoint, data } = body;

    // 構建完整的 URL
    let url = endpoint.startsWith('http') 
      ? endpoint 
      : `https://app.dynamicauth.com/api/v0${endpoint}`;
    
    // 替換 URL 中的 {environmentId}
    url = url.replace('{environmentId}', environmentId);

    const response = await axios({
      method: method || 'GET',
      url: url,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: data,
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