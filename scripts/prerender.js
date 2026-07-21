import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Routes to pre-render
const routes = [
  "/",
  "/linktree",
  "/philosophy",
  "/how-it-works",
  "/alternatives/rosebud",
  "/alternatives/stoic",
  "/join",
  "/team",
  "/terms",
  "/partners",
  "/blog",
  "/blog/the-conversation-after-the-workshop",
  "/blog/what-a-hundred-honest-conversations-taught-us",
  "/100-conversations",
  "/reflection-questions/feeling-stuck-at-work",
  "/reflection-questions/before-a-big-decision",
  "/reflection-questions/after-a-breakup",
  "/reflection-questions/cant-sleep",
  "/reflection-questions/feeling-behind",
  "/reflection-questions/before-a-career-change",
  "/reflection-questions/feeling-numb",
  "/reflection-questions/sunday-night",
  "/reflection-questions/overwhelmed",
  "/reflection-questions/after-rejection",
  "/privacy",

  // Cluster 1
  "/ai-journaling-vs-therapy",
  "/is-ai-journaling-private",
  "/free-ai-journaling",
  "/emotional-check-in",
  "/feeling-disconnected",
  "/self-awareness",
  "/inner-alignment",
  "/quiet-wellness",
  
  // Cluster 2
  "/feeling-stuck",
  "/feeling-stuck-in-life",
  "/feeling-stuck-but-busy",
  "/feeling-stuck-in-your-20s",
  "/stuck-in-a-job",
  "/languishing-vs-burnout-vs-depression",
  "/just-do-something-doesnt-work",
  "/knowing-what-you-want",

  // Cluster 3
  "/guided-reflection",
  "/guided-reflection-end-of-day",
  "/guided-reflection-morning",
  "/guided-reflection-overwhelm",
  "/guided-reflection-clarity",
  "/guided-reflection-decision-making",
  "/guided-reflection-weekly-review",
  "/guided-reflection-career",

  // Cluster 4
  "/philosophy-streaks",
  "/philosophy-self-optimisation-critique",
  "/philosophy-inner-alignment",
  "/philosophy-no-morning-routine",
  "/philosophy-why-wellness-got-loud",
  "/philosophy-growth-at-your-own-pace"
];

async function run() {
  const serverEntryPath = path.resolve(__dirname, "../dist/server/entry-server.js");
  const templatePath = path.resolve(__dirname, "../dist/index.html");

  if (!fs.existsSync(serverEntryPath)) {
    console.error(`Server build not found at ${serverEntryPath}. Make sure to build the server first.`);
    process.exit(1);
  }

  if (!fs.existsSync(templatePath)) {
    console.error(`Template not found at ${templatePath}. Make sure to build the client first.`);
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(serverEntryPath).href);
  const template = fs.readFileSync(templatePath, "utf8");

  console.log("Starting prerendering...");

  for (const route of routes) {
    console.log(`Prerendering route: ${route}`);
    const helmetContext = {};
    const appHtml = render(route, helmetContext);
    const { helmet } = helmetContext;

    let html = template;

    // Inject Helmet tags if present
    if (helmet) {
      const helmetTags = [
        helmet.title?.toString(),
        helmet.meta?.toString(),
        helmet.link?.toString(),
        helmet.script?.toString()
      ].filter(Boolean).join("\n");

      // Replace existing title or inject tags inside the head
      // Let's strip the existing title from template to avoid duplicates
      html = html.replace(/<title>[^]*?<\/title>/, "");
      html = html.replace("</head>", `${helmetTags}\n</head>`);
    }

    // Inject rendered application HTML
    html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Determine output file path
    let fileDir = path.resolve(__dirname, "../dist", route.replace(/^\//, ""));
    let filePath;
    if (route === "/") {
      filePath = path.resolve(__dirname, "../dist/index.html");
    } else {
      fs.mkdirSync(fileDir, { recursive: true });
      filePath = path.join(fileDir, "index.html");
    }

    fs.writeFileSync(filePath, html, "utf8");
    console.log(`Saved: ${filePath}`);
  }

  console.log("Prerendering completed successfully!");
}

run().catch(err => {
  console.error("Error during prerendering:", err);
  process.exit(1);
});
