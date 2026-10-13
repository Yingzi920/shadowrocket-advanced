// Moon AI Health Check v2.0 - manual HTTP trigger.
// Only fetches public homepages. No cookies, tokens or account APIs.
const sites = [
  { name: "ChatGPT", url: "https://chatgpt.com/" },
  { name: "Claude", url: "https://claude.ai/" },
  { name: "Gemini", url: "https://gemini.google.com/" }
];
const results = new Array(sites.length);
let pending = sites.length;
let finished = false;
function complete() {
  if (finished || --pending !== 0) return;
  finished = true;
  const body = JSON.stringify({
    lab: "Moon AI Health Check",
    mode: "manual",
    note: "Public homepage HTTP checks only; 403/429 can reflect bot protection, not outage.",
    results
  }, null, 2);
  $done({ response: { status: 200, headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  }, body } });
}
sites.forEach((site, index) => {
  try {
    $httpClient.get({ url: site.url, timeout: 8 }, (error, response) => {
      const code = response && (response.status || response.statusCode);
      results[index] = { name: site.name, status: error ? "network_error" : (code ? "HTTP_" + code : "no_response") };
      complete();
    });
  } catch (e) {
    results[index] = { name: site.name, status: "request_error" };
    complete();
  }
});
