# Load Testing

Install artillery using `yarn add artillery`

Started phase 0 (Load Test), duration: 30s @ 03:32:56(+0800) 2021-01-11
Report @ 03:33:06(+0800) 2021-01-11
Elapsed time: 10 seconds
  Scenarios launched:  999
  Scenarios completed: 998
  Requests completed:  2008
  Mean response/sec: 202.11
  Response time (msec):
    min: 0.7
    max: 600.8
    median: 2.4
    p95: 17.5
    p99: 21.9
  Codes:
    200: 493
    500: 1515

Report @ 03:33:16(+0800) 2021-01-11
Elapsed time: 20 seconds
  Scenarios launched:  1000
  Scenarios completed: 1000
  Requests completed:  2014
  Mean response/sec: 214.71
  Response time (msec):
    min: 0.7
    max: 620.8
    median: 2.2
    p95: 16.9
    p99: 22.3
  Codes:
    200: 493
    500: 1521

Warning: 
CPU usage of Artillery seems to be very high (pids: 25404)
which may severely affect its performance.
See https://artillery.io/docs/faq/#high-cpu-warnings for details.

Report @ 03:33:26(+0800) 2021-01-11
Elapsed time: 30 seconds
  Scenarios launched:  1000
  Scenarios completed: 1000
  Requests completed:  2004
  Mean response/sec: 200.6
  Response time (msec):
    min: 0.7
    max: 614.7
    median: 2.4
    p95: 16.9
    p99: 21.4
  Codes:
    200: 498
    500: 1506

Report @ 03:33:27(+0800) 2021-01-11
Elapsed time: 31 seconds
  Scenarios launched:  1
  Scenarios completed: 2
  Requests completed:  6
  Mean response/sec: 9.8
  Response time (msec):
    min: 1.2
    max: 640.1
    median: 3.1
    p95: 640.1
    p99: 640.1
  Codes:
    500: 6

All virtual users finished
Summary report @ 03:33:27(+0800) 2021-01-11
  Scenarios launched:  3000
  Scenarios completed: 3000
  Requests completed:  6032
  Mean response/sec: 193.89
  Response time (msec):
    min: 0.7
    max: 640.1
    median: 2.3
    p95: 17.1
    p99: 21.9
  Scenario counts:
    Rides: 1516 (50.533%)
    Health: 1484 (49.467%)
  Codes:
    200: 1484
    500: 4548

Done in 32.39s.