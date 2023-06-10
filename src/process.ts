import http from 'http';
import cluster from 'cluster';

const generatePayload = (): string => {
  return JSON.stringify(
    { data: 'some_random_string' + new Date().getMilliseconds() }
  );
};

const sendRequest = (): void => {
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
      res.on('end', () => {});
    });

    req.on('error', error => {
      console.log(error);
    });
    req.write(payload);
    req.end();
};

const sendConcurrentRequests = (): void => {
  for (let i = 0; i < 5; i++) {
    sendRequest();
  }
};

if (cluster.isMaster) {
  for (let i = 0; i < 5; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('Worker' + worker.process.pid);

    cluster.fork();
  });
} else {
  console.log(`Process id ${process.pid}`);

  setInterval(sendConcurrentRequests, 1000);
}
