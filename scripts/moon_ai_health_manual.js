// Moon AI Health Check v3.0: manual public homepage probe.
// No authentication, cookies, request interception, or MITM.
const sites = [
  { name: "ChatGPT", url: "https://chatgpt.com/" },
  { name: "Claude", url: "https://claude.ai/" },
  { name: "Gemini", url: "https://gemini.google.com/" },
  { name: "Grok", url: "https://grok.com/" },
  { name: "Perplexity", url: "https://www.perplexity.ai/" },
  { name: "DeepSeek", url: "https://www.deepseek.com/" }
];
const results = new Array(sites.length);
let pending = sites.length;
let finished = false;
function complete() {
  if (--pending !== 0 || finished) return;
  finished = true;
  const body = JSON.stringify({
    lab: "Moon AI Health Check",
    version: "3.0",
    mode: "manual",
    note: "HTTP homepage reachability only. 403/429 may be bot protection; errors cannot reliably distinguish DNS, TLS and network failures.",
    results
  }, null, 2);
  $done({response: {status: 200, headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }, body}});
}
sites.forEach((site, index) => {
  const start = Date.now();
  try {
    $httpClient.get({url: site.url, timeout: 10}, (error, response) => {
      const code = response && (response.status || response.statusCode);
      const status = error ? "network_error" : (code ? "HTTP_" + code : "no_response");
      results[index] = {name: site.name, status, elapsed_ms: Date.now() - start};
      complete();
    });
  } catch (e) {
    results[index] = {name: site.name, status: "request_error", elapsed_ms: Date.now() - start};
    complete();
  }
});
