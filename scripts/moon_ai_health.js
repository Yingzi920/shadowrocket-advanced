// Moon AI Health Check: public homepage reachability only
// No cookies, credentials, or account APIs.
const targets = [
  ["ChatGPT", "https://chatgpt.com/"],
  ["Claude", "https://claude.ai/"],
  ["Gemini", "https://gemini.google.com/"]
];
let remaining = targets.length;
const results = [];
function finish() {
  remaining--;
  if (remaining === 0) {
    const message = results.join(" | ");
    console.log("[Moon AI Health] " + message);
    if (typeof $notification !== "undefined") {
      $notification.post("Moon AI Health", "Basic connectivity check", message);
    }
    $done();
  }
}
targets.forEach(([name,url]) => {
  $httpClient.get({url, timeout: 8}, (err, resp, body) => {
    const code = resp && (resp.status || resp.statusCode);
    const status = err ? "network error" : (code ? "HTTP " + code : "no response");
    results.push(name + ": " + status);
    finish();
  });
});
