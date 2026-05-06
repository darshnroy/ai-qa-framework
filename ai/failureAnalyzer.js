function analyzeFailure(error) {

  if (!error) {
    return "❓ No error information available.";
  }

  // ⏱ Timeout issues
  if (error.includes("TimeoutError")) {
    return `
⏱ Timeout Error

Possible reasons:
- Element not loaded
- Wrong selector
- Slow page load

Fix suggestions:
- Add waitForSelector()
- Increase timeout
- Verify locator
`;
  }

  // 🔍 Selector issues
  if (
    error.includes("waiting for locator") ||
    error.includes("not found")
  ) {
    return `
🔍 Selector Issue

Possible reasons:
- Element selector incorrect
- DOM changed
- Element hidden

Fix suggestions:
- Re-check selector
- Use Playwright Inspector
- Add proper waits
`;
  }

  // 👁 Visibility issues
  if (error.includes("not visible")) {
    return `
👁 Element Visibility Issue

Possible reasons:
- Hidden element
- Overlay blocking click

Fix suggestions:
- Wait for visibility
- Scroll into view
- Remove popup/overlay
`;
  }

  // 🌍 Navigation issues
  if (error.includes("Navigation")) {
    return `
🌍 Navigation Issue

Possible reasons:
- Redirect loop
- Page not fully loaded

Fix suggestions:
- Use waitForLoadState()
- Verify URL
`;
  }

  // 🤖 Google bot detection
  if (error.includes("sorry/index")) {
    return `
🤖 Automation Blocked

Google detected automated traffic.

Fix suggestions:
- Avoid Google for automation demos
- Use example.com or playwright.dev
`;
  }

  // ❓ Default
  return `
❓ Unknown Issue

Check:
- Playwright logs
- Selectors
- Browser behavior
`;
}

module.exports = { analyzeFailure };