# Neil Patel Portfolio

## What Is This
Professional portfolio website showcasing Neil's projects and skills.

**Live site:** https://neilkpatel.com
**Repo:** https://github.com/neilkpatel/1-2-26-portfolio

---

## Tech Stack
- React + Vite
- Tailwind CSS
- Vercel Analytics
- Hosted on Vercel (custom domain: neilkpatel.com)

---

## Key Files
- `src/App.jsx` — Main app component (hero, projects, contact sections)
- `public/projects.json` — Project data (name, description, tags, links, icons)
- `tailwind.config.js` — Tailwind configuration
- `index.html` — Entry point

---

## Design System
- **Theme:** Dark terminal/coder aesthetic
- **Background:** #0a0a0a with subtle green grid pattern
- **Accents:** Green-400/Green-500 (terminal green)
- **Font:** Monospace for headers, UI elements; system fonts for body
- **Cards:** Terminal window style with red/yellow/green dots

---

## Current Projects (in projects.json)

### Production (Live Sites)
1. MJ Growth Consulting (1/23/26) - Marketing website for Fortune 100 sales exec
2. Horizon Alliance (2/3/26) - Gaming alliance hub for Last War

### Experimental
1. ATC Radar Game (1/3/26) - Air traffic control simulation
2. News Tracker (1/2/26) - Real-time news aggregator
3. New Year's Countdown 2026 (1/1/26) - Countdown with particles
4. Sports Scores (12/31/25) - Live sports tracking
5. Jackson Hole Snow Tracker (12/28/25) - Ski conditions dashboard

---

## Sections
1. **Hero** — Name, title ("Marketing Scientist / Agentic Engineer"), headshot (grayscale→color on hover), GitHub/LinkedIn links
2. **Projects** — Two categories: Live (terminal-style cards) and Experimental (mini terminal cards)
3. **Contact** — GitHub and LinkedIn links only (no email)
4. **Footer** — Build timestamp, copyright

---

## Deployment
```bash
cd ~/Desktop/Projects/1_2_26_portfolio
npm run build
vercel --prod
```

---

## Links
- **GitHub:** https://github.com/neilkpatel
- **LinkedIn:** https://www.linkedin.com/in/neilkiranpatel/

## Contacts
- **Aaron Grobin:** aarongrobin@gmail.com

---

## Session Notes

### Feb 3, 2026
- Created CLAUDE.md for project context
- Site purpose: Professional portfolio highlighting projects
- Major redesign: Light casual theme → Dark terminal/coder aesthetic
- Added production projects: MJ Growth Consulting, Horizon Alliance
- Split projects into "Live" and "Experimental" categories
- Added headshot with grayscale→color hover effect
- Updated title to "Marketing Scientist / Agentic Engineer"
- Removed email contact and "seeking projects" messaging
- Terminal-style project cards with red/yellow/green window dots
- Monospace fonts throughout for coder vibe
