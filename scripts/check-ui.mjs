import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
await mkdir("artifacts", { recursive: true });
const browser = await chromium.launch({ headless: true, channel: "msedge" });
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
for (const width of [320, 375, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto("http://127.0.0.1:3001", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  for (const img of await page.locator("img").all()) {
    console.log("Checking image", await img.getAttribute("src"));
    await img.evaluate((el) => {
      el.loading = "eager";
      el.scrollIntoView({ behavior: "instant" });
    });
    await img.evaluate((el) => el.decode());
  }
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({
    path: `artifacts/page-${width}.png`,
    fullPage: true,
  });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw new Error(`Overflow at ${width}`);
  const broken = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.some((i) => !i.complete || i.naturalWidth === 0),
    );
  if (broken) throw new Error(`Broken image at ${width}`);
  console.log(`${width}px: no overflow, images loaded`);
}
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole("button", { name: "Open menu" }).click();
await page
  .getByRole("navigation")
  .getByRole("link", { name: "The designs" })
  .click();
if (
  (await page
    .getByRole("button", { name: "Open menu" })
    .getAttribute("aria-expanded")) !== "false"
)
  throw new Error("Menu did not close");
await page.getByRole("link", { name: /The Blue Hour.*Enquire now/ }).click();
if ((await page.locator("select").inputValue()) !== "The Blue Hour")
  throw new Error("Design not preselected");
await page.getByLabel("Your name").fill("Preview Visitor");
await page.getByLabel("Email address").fill("visitor@example.com");
let sent = false;
page.on("request", (r) => {
  if (r.method() === "POST" && r.url().includes("/api/leads")) sent = true;
});
await page.getByRole("button", { name: "Enquire now", exact: true }).click();
await page.getByRole("status").waitFor();
if (!sent) throw new Error("Lead was not sent to /api/leads");
console.log("Lead successfully submitted to SQLite database");

// Test Admin Login and Leads Dashboard
await page.goto("http://127.0.0.1:3001/admin", { waitUntil: "load" });
if (!page.url().includes("/login")) throw new Error("Unauthenticated admin was not redirected to /login");

await page.getByPlaceholder("Username").fill("admin");
await page.getByPlaceholder("Password").fill("vsdfhgfgjhjerhh@sdsg3$");
await page.getByRole("button", { name: "Sign in to Dashboard" }).click();

await page.waitForURL("**/admin");
const leadVisible = await page.getByText("Preview Visitor").isVisible();
if (!leadVisible) throw new Error("Submitted lead not found on admin panel");
console.log("Admin login and lead verification passed!");

await page.goto("http://127.0.0.1:3001");
await page
  .locator("summary")
  .filter({ hasText: "Can I request a custom design?" })
  .click();
const results = await new AxeBuilder({ page })
  .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
  .analyze();
console.log(
  "Accessibility violations:",
  JSON.stringify(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ),
);
console.log("Browser errors:", errors);
if (results.violations.length || errors.length) process.exitCode = 1;
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("http://127.0.0.1:3001");
console.log(
  "Reduced motion scroll behavior:",
  await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  ),
);
try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("https://www.basically.agency/", {
    waitUntil: "load",
    timeout: 30000,
  });
  await page.screenshot({ path: "artifacts/reference.png", fullPage: false });
} catch (e) {
  console.log("Reference browser:", e.message);
}
await browser.close();
