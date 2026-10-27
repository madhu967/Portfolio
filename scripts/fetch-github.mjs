import { writeFileSync } from "fs";
import { execSync } from "child_process";

const USERNAME = process.env.GITHUB_USERNAME || "madhu967";

const QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}`;

const LEVEL = {
  NONE: "0",
  FIRST_QUARTILE: "1",
  SECOND_QUARTILE: "2",
  THIRD_QUARTILE: "3",
  FOURTH_QUARTILE: "4"
};

async function main() {
  let token = process.env.GITHUB_TOKEN;
  if (!token) {
    try {
      token = execSync("gh auth token").toString().trim();
    } catch (e) {
      console.warn("No GITHUB_TOKEN or gh CLI found. Falling back to public API.");
    }
  }

  if (token) {
    console.log(`Fetching GitHub contribution calendar for ${USERNAME} via GraphQL...`);
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "portfolio-github-fetcher"
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } })
    });

    const json = await res.json();
    if (!json.data?.user) {
      throw new Error(`GraphQL error: ${JSON.stringify(json)}`);
    }

    const calendar = json.data.user.contributionsCollection.contributionCalendar;
    const days = calendar.weeks.flatMap((w) => w.contributionDays);

    const payload = {
      username: USERNAME,
      start: days[0].date,
      total: calendar.totalContributions,
      counts: days.map((d) => d.contributionCount),
      levels: days.map((d) => LEVEL[d.contributionLevel] || "0").join("")
    };

    writeFileSync("data/github.json", JSON.stringify(payload, null, 2));
    writeFileSync("src/data/github.json", JSON.stringify(payload, null, 2));
    console.log(`Saved ${days.length} days (${payload.total} contributions) to data/github.json`);
  } else {
    // Fallback: public contribution API
    console.log(`Fetching public GitHub contribution calendar for ${USERNAME}...`);
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`);
    const json = await res.json();
    const all = json.contributions;
    // Extract last 371 days (53 weeks)
    const recent = all.slice(-371);
    const sum = recent.reduce((acc, d) => acc + d.count, 0);

    const payload = {
      username: USERNAME,
      start: recent[0].date,
      total: sum,
      counts: recent.map((d) => d.count),
      levels: recent.map((d) => String(d.level)).join("")
    };

    writeFileSync("data/github.json", JSON.stringify(payload, null, 2));
    writeFileSync("src/data/github.json", JSON.stringify(payload, null, 2));
    console.log(`Saved ${recent.length} days (${payload.total} contributions) to data/github.json`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
