import crypto from 'crypto';

export function generateAPIKey(length: number): string {
  const apiKey = crypto.randomBytes(length).toString('hex');
  return apiKey;
}

export function unauthResponse() {
  return {
    statusCode: 401,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization,Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      error: 'Unauthorized',
    }),
  };
}
