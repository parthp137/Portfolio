# Personal Portfolio Website 

This project is a front-end portfolio website designed to showcase my skills, projects, certifications, and background as a web developer. It features a modern dark/light theme interface with smooth scrolling, animated sections, and a fully responsive layout. The site is built using HTML, CSS, and JavaScript with persistent theme preferences.

## Live Demo
[https://parthp137.github.io/Portfolio/](https://parthp137.github.io/Portfolio/)

## Features

### Theme & Palette System
- **Dual-Theme Palette Switcher:** Switch between curated color palettes (Theme 1: Cyber Emerald & Theme 4: Obsidian Coral)
- **Dark/Light Mode Toggle:** Switch between dark and light themes with a single click
- **System Preference Detection:** Automatically syncs with the user's OS color scheme (`prefers-color-scheme`) on first visit
- **LocalStorage Persistence:** Theme and palette preferences are saved and restored across sessions (`portfolio-theme-palette` and `theme`)
- **Smooth Transitions:** All color changes animate smoothly between themes and palettes
- **Dynamic Icons & Swatches:** Real-time visual feedback with two-tone swatch previews and active checkmarks

### Navigation System
- **Scroll Progress Indicator:** Top gradient progress bar dynamically tracking reading depth with theme-adaptive colors
- **Dynamic Elevation:** Glassmorphism elevation and blur on scroll (`.scrolled`)
- **Pill Navigation:** Modern floating pill link container on desktop with active state highlight
- **Mobile Navigation Drawer:** Responsive slide-in drawer with animated hamburger morphing icon and theme selector
- **Quick Action CTA:** Integrated header CTA button for instant conversion
- **Smooth Scrolling:** Offset-corrected navigation between sections
- **Active Link Highlighting:** Scroll spy tracking active sections in real time
- **Scroll Reveal Animations:** IntersectionObserver-powered reveal transitions for all sections

### UI Sections
- **Home:** Dynamic headline, role description, profile image, call-to-action buttons, resume download 
- **About Me:** Education and professional experience timeline with structured cards
- **Projects:** Full-stack and ML projects (CareSync, LiveProof) with detailed bullet points and tech stacks
- **Skills:** 7 categorized skill sections (Languages, Frontend, Backend, Machine Learning, Databases, Tools, Concepts) with badge styling
- **Activity:** GitHub activity contribution graph heatmap with theme-matching dynamic colors
- **Achievements:** Competition results and recognitions with winner/finalist indicators
- **Certifications:** Card layout with direct certificate preview/download buttons  
- **Contact:** Professional contact form with form validation and feedback alert

### Functionality
- Dual theme switching and Dark/Light toggle with localStorage persistence
- Dynamic GitHub contribution heatmap loaded via live API and cached fallback
- Scroll-based active section detection
- Smooth navigation transitions with offset correction
- Contact form validation and submission feedback
- Responsive design with breakpoints for desktops, tablets, and mobile devices

## Tech Stack
- **Frontend:** HTML5, Vanilla CSS3, JavaScript (ES6+)  
- **Storage:** LocalStorage API for theme & palette persistence  
- **Libraries & Fonts:** Font Awesome 6.5.0, Google Fonts (Inter)  
- **Deployment:** GitHub Pages  
- **Version Control:** Git & GitHub

## Design Overview

### Theme 1: Cyber Emerald (Default)
- **Dark Mode:** Deep sleek background (`#0c0d10`, `#17181c`), vibrant emerald accent (`#37ff8b`)
- **Light Mode:** Clean white background (`#ffffff`, `#f8fafc`), crisp emerald accent (`#059669`)

### Theme 4: Obsidian Coral
- **Dark Mode:** Deep obsidian navy (`#0d1b2a`, `#17273d`), vibrant coral accent (`#ff5d5d`)
- **Light Mode:** Platinum silver background (`#e0e1dd`, `#ffffff`), vivid coral accent (`#ff5d5d`)

## Project Structure
```
Portfolio/
├── .gitignore          # Git ignore rules for OS and IDE files
├── index.html          # Main webpage with semantic markup & SEO tags
├── styles.css          # Design system, CSS variables & responsive layout
├── script.js           # Theme toggle, scroll animations & interactive logic
├── themes_info.txt     # Theme palettes archive and variable definitions
├── activity.json       # GitHub activity and contribution cache
├── images/             # Profile and asset images
├── certificates/       # Certificate & Resume PDFs
└── README.md           # Project documentation
```

## Key Implementation Details

### Theme & Palette System
- **CSS Variables:** Structured design tokens for `theme-1` and `theme-4` with Dark and Light mode variants
- **JavaScript Logic:** `applyPalette()` applies active palette classes to `document.body` and updates selector states
- **Persistence:** Saved in `localStorage` under `portfolio-theme-palette` and `theme`
- **Icon & Swatch Switching:** Toggles `fa-moon`/`fa-sun` and updates active palette checkmarks

### Scroll Animations
- **Scroll Detection:** Window scroll event listener evaluating element bounding rectangles
- **CSS Classes:** `.fade-up`, `.fade-left`, `.fade-right` transition into `.show` on viewport entry

### Active Navigation
- **Scroll Detection:** Monitors `window.scrollY` position against section offsets
- **Dynamic Highlighting:** Adds/removes `.active` class on nav links

## How to Run

### Option 1: View Live Demo
Visit the deployed version at: [https://parthp137.github.io/Portfolio/](https://parthp137.github.io/Portfolio/)

### Option 2: Clone and Run Locally

1. **Clone the repository:**
```bash
git clone https://github.com/parthp137/Portfolio.git
cd Portfolio
```

2. **Open directly in browser:**
   - Simply open `index.html` in your preferred browser

3. **OR start a local server:**
```bash
# Using Python 3
python -m http.server 8000

# OR using Node.js
npx http-server -p 8000
```

4. **Open your browser and visit:**
   - `http://localhost:8000`

## Browser Compatibility
- Chrome
- Firefox
- Safari
- Edge

## License
MIT License - Free to use and modify

## Contact
- **GitHub:** [parthp137](https://github.com/parthp137)
- **LinkedIn:** [Parth Patwardhan](https://www.linkedin.com/in/parth-patwardhan-3a8410338/)
- **Email:** parthp130705@gmail.com
- **Live Portfolio:** [https://parthp137.github.io/Portfolio/](https://parthp137.github.io/Portfolio/)
