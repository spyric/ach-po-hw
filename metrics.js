const Prometheus = require('prom-client')
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'app_request_latency_seconds',
  help: 'Application Request Latency',
  labelNames: ["method", "endpoint"],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 1000]
})

const httpRequestCount = new Prometheus.Counter({
  name: 'app_request_count',
  help: 'Application Request Count',
  labelNames: ["method", "endpoint", "http_status"],
})

const appVersion = new Prometheus.Gauge({
  name: 'app_version',
  help: 'Application Version',
  labelNames: ["version", "config"],
})

appVersion.labels(1, process.env.NODE_ENV || 'development').set(1)

const getDurationInMilliseconds = (start) => {
  const NS_PER_SEC = 1e9
  const NS_TO_MS = 1e6
  const diff = process.hrtime(start)

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
}

const speedMiddleware = function(req, res, next)  {
  const start = process.hrtime()
  let wasFinished = false;

  const handler = () => {
    if(wasFinished) return;
    wasFinished = true;
    const durationInMilliseconds = getDurationInMilliseconds (start)

    if(req.SkipMetrics) {
      return;
    }
    httpRequestDurationMicroseconds.labels(req.method, req.url).observe(durationInMilliseconds);
    httpRequestCount.labels(req.method, req.url, res.statusCode).inc();
  };

  res.on('finish', handler)
  res.on('close', handler)

  next()
};

module.exports = {
  Prometheus,
  speedMiddleware,
}
