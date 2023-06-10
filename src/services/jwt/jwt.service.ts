export const decodeJWT = (token: string) => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token');
  }

  const encodedHeader = parts[0];
  const encodedPayload = parts[1];

  const header = JSON.parse(base64UrlDecode(encodedHeader));
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  return { header, payload };
};

const base64UrlDecode = (input: string) => {
  input = input.replace(/-/g, '+').replace(/_/g, '/');
  while (input.length % 4) {
    input += '=';
  }
  return Buffer.from(input, 'base64').toString();
};
