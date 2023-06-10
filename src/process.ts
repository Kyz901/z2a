import http from 'http';

const generatePayload = (): string => {
  return JSON.stringify(
    { data: 'some_random_string' + new Date().getMilliseconds() }
  );
};

const sendRequest = (): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const payload = generatePayload();

    console.log(payload);

    const options = {
      protocol: 'http:',
      hostname: 'localhost',
      port: 8082,
      path: '/v1/redis',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = http.request(options, (res) => {
      res.setEncoding('utf8');
      res.on('data', () => {});
      res.on('end', resolve);
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
};

const sendConcurrentRequests = async (): Promise<void> => {
  const requests = [];
  for (let i = 0; i < 5; i++) {
    requests.push(sendRequest());
  }
  await Promise.all(requests);
}

const main = async (): Promise<void> => {
  while (true) {
    console.log('Sending request...');
    await sendConcurrentRequests();

    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

main().catch((error) => console.error('Error:', error));
