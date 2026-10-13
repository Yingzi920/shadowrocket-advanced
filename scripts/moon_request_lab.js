// Moon Script Lab: only a dedicated HTTP test path.
// Does not read cookies, authorization headers or private data.
const body = JSON.stringify({
  lab: "Moon Script Lab",
  success: true,
  note: "Local scripted response; no upstream request",
  time: "static-demo"
});
$done({response: {status: 200, headers: {"Content-Type": "application/json; charset=utf-8"}, body}});
