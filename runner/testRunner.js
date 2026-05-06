const { exec } = require("child_process");
const axios = require("axios");
const { analyzeFailure } = require("../ai/failureAnalyzer");

// Unique test run name
const testName = `test_${Date.now()}`;

console.log("🚀 Running Playwright tests...\n");

exec(
  "npx playwright test --reporter=line",
  async (err, stdout, stderr) => {

    // =========================
    // FULL PLAYWRIGHT OUTPUT
    // =========================
    console.log("📄 Playwright Output:\n");
    console.log(stdout);

    // =========================
    // TEST FAILED
    // =========================
    if (err) {

      console.log("\n❌ Test Failed");

      // ✅ IMPORTANT:
      // Playwright usually prints failures in stdout
      const rawError = stdout || stderr || err.message;

      // =========================
      // EXTRACT USEFUL ERROR
      // =========================
      let usefulError = rawError;

      // Timeout errors
      const timeoutMatch = rawError.match(
        /TimeoutError[\s\S]*?(?=Error Context|$)/
      );

      // Locator related errors
      const locatorMatch = rawError.match(
        /locator\.[\s\S]*?(?=Error Context|$)/
      );

      // Strict mode / visibility issues
      const visibilityMatch = rawError.match(
        /Element is not visible[\s\S]*?(?=Error Context|$)/
      );

      if (timeoutMatch) {
        usefulError = timeoutMatch[0];
      } else if (locatorMatch) {
        usefulError = locatorMatch[0];
      } else if (visibilityMatch) {
        usefulError = visibilityMatch[0];
      }

      // =========================
      // EXTRACT FAILED STEP
      // =========================
      const failedLineMatch = rawError.match(
        />\s+\d+\s+\|\s+(.*)/
      );

      const failedStep = failedLineMatch
        ? failedLineMatch[1]
        : "Unable to detect failed step";

      console.log("\n🚨 FAILED STEP:\n");
      console.log(failedStep);

      // =========================
      // SHOW CLEAN ERROR
      // =========================
      console.log("\n🧾 EXTRACTED ERROR:\n");
      console.log(usefulError);

      // =========================
      // AI ANALYSIS
      // =========================
      const ai = analyzeFailure(usefulError);

      console.log("\n🤖 AI Insight:\n");
      console.log(ai);

      // =========================
      // SAVE FAILURE RESULT
      // =========================
      try {

        await axios.post("http://localhost:3000/results", {
          name: testName,
          status: "fail",
          duration: 2.5,
          ai_analysis: `
FAILED STEP:
${failedStep}

AI ANALYSIS:
${ai}
`
        });

        console.log("\n📦 Failure result saved to database");

      } catch (apiErr) {

        console.error(
          "\n❌ Failed to send result:",
          apiErr.message
        );
      }

    }

    // =========================
    // TEST PASSED
    // =========================
    else {

      console.log("\n✅ Tests Passed");

      try {

        await axios.post("http://localhost:3000/results", {
          name: testName,
          status: "pass",
          duration: 1.2,
          ai_analysis: "✅ No issues detected"
        });

        console.log("\n📦 Success result saved to database");

      } catch (apiErr) {

        console.error(
          "\n❌ Failed to send result:",
          apiErr.message
        );
      }
    }
  }
);