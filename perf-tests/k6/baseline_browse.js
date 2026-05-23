import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,              // number of virtual users
  duration: '1m',       // total test duration
};

const BASE_URL = 'https://test.k6.io';

export default function () {
  // Step 1: Home page
  let res = http.get(`${BASE_URL}/`);
  check(res, {
    'home status is 200': (r) => r.status === 200,
  });

  // Think time: user reads the page
  sleep(3);

  // Step 2: Browse another page (e.g. news)
  res = http.get(`${BASE_URL}/news.php`);
  check(res, {
    'news status is 200': (r) => r.status === 200,
  });

  // Think time before next iteration
  sleep(3);
}