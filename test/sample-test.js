const { spawn } = require("child_process");
const http = require("http");

const server = spawn("node", ["index.js"], { stdio: "inherit" });

setTimeout(() => {
  http.get("http://127.0.0.1:3000/health", (res) => {
    let data = "";
    res.on("data", chunk => data += chunk);
    res.on("end", () => {
      try {
        const obj = JSON.parse(data);
        if (obj.status === "ok") {
          console.log("TEST PASS");
          process.exit(0);
        } else {
          console.error("TEST FAIL - bad payload");
          process.exit(2);
        }
      } catch (e) {
        console.error("TEST FAIL - invalid json", e);
        process.exit(2);
      }
    });
  }).on("error", (err) => {
    console.error("TEST FAIL - request error", err);
    process.exit(2);
  });
}, 700);
