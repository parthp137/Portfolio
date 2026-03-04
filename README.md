# Personal Portfolio Website 

This project is a front-end portfolio website designed to showcase my skills, projects, certifications, and background as a web developer. It features a modern dark/light theme interface with smooth scrolling, animated sections, and a fully responsive layout. The site is built using HTML, CSS, and JavaScript with persistent theme preferences.

## Live Demo
https://parthp137.github.io/Portfolio/

## Features

### Theme System
- **Dark/Light Mode Toggle:** Switch between dark and light themes with a single click
- **LocalStorage Persistence:** Theme preference is saved and restored across sessions
- **Smooth Transitions:** All color changes animate smoothly between themes
- **Dynamic Icons:** Theme toggle button updates icon (moon/sun) based on active theme

### Navigation System
- Fixed navigation bar with theme toggle button
- Smooth scrolling between sections with offset
- Active link highlighting based on scroll position
- Scroll reveal animations for all sections

### UI Sections
- **Home:** Dynamic headline, role description, profile image, call-to-action buttons  
- **About Me:** Education and professional experience timeline with 3 cards
- **Projects:** Full-stack and ML projects (CareSync, LiveProof) with detailed bullet points and tech stacks
- **Skills:** 7 categorized skill sections (Languages, Frontend, Backend, ML/AI, Databases, Tools, Concepts) with badge styling
- **Achievements:** Competition results and recognitions with winner/finalist indicators
- **Certifications:** Card layout with certificate download buttons  
- **Contact:** Professional form with name, email, and message fields

### Functionality
- Theme toggle with localStorage persistence
- Scroll-based active section detection
- Smooth navigation transitions with offset correction
- Contact form alert on submission (front-end only)
- Responsive design with 3 breakpoints (1024px, 900px, 640px)

## Tech Stack
**Frontend:** HTML5, CSS3, JavaScript (ES6+)  
**APIs:** LocalStorage API for theme persistence  
**Libraries:** Font Awesome 6.5.0 (icons), Google Fonts (Poppins)  
**Tools:** VS Code, Git, GitHub Pages  
**Version Control:** Git & GitHub

## Design Overview
The website features a modern dual-theme design system:

### Dark Theme (Default)
- Deep navy background (#0a192f, #112240)
- Cyan accent color (#64ffda)
- High contrast for readability
- Professional developer aesthetic

### Light Theme
- Clean white background (#ffffff)
- Dark text (#212529)
- Blue accent (#0066cc)
- Optimized for daytime viewing

### Design Elements
- CSS Variables for theme switching (40+ variables)
- Large hero typography with gradient effects
- Card-style sections with hover animations
- Badge-style skill tags
- Award icons for achievements
- Smooth fade-in scroll animations
- Responsive grid layouts

All transitions and interactions are implemented using vanilla JavaScript with no dependencies.

## Limitations
- No backend integration for the contact form
- Messages are not stored or emailed
- Local assets required for images and certificates
- Single-page layout (no routing)

## Future Enhancements
- ✅ ~~Light/Dark mode toggle~~ **COMPLETED**
- Email integration for contact form (EmailJS or backend API)
- Dynamic project loading from JSON/API
- Blog or timeline section
- Backend for form submissions
- Project filtering by technology/category
- Animated statistics/counters
- Testimonials section

## Project Structure
```
Portfolio/
├── index.html          # Main webpage (422 lines)
├── styles.css          # Styling with CSS variables (1056 lines)
├── script.js           # Theme toggle and interactivity (101 lines)
├── images/             # Profile and section images
├── certificates/       # Certificate PDFs
└── README.md           # Project documentation
```

## Key Implementation Details

### Theme Toggle System
- **CSS Variables:** 40+ variables defined in `:root` and overridden in `body.light-theme`
- **JavaScript Logic:** Event listener on theme toggle button, classList manipulation
- **Persistence:** `localStorage.setItem('theme')` and `localStorage.getItem('theme')`
- **Icon Switching:** Dynamic class changes between `fa-moon` and `fa-sun`

### Scroll Animations
- **IntersectionObserver:** Tracks element visibility in viewport
- **CSS Classes:** `.hidden` (opacity: 0) → `.show` (opacity: 1, transform)
- **Smooth Transitions:** 1s ease-out animation on reveal

### Active Navigation
- **Scroll Detection:** Monitors `window.scrollY` position
- **Section Matching:** Compares scroll position with section offsets
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

# OR using Python 2
python -m SimpleHTTPServer 8000

# OR using Node.js (if you have http-server installed)
npx http-server -p 8000
```

4. **Open your browser and visit:**
   - `http://localhost:8000`

### Testing Theme Toggle
- Click the moon/sun icon in the navigation bar
- Refresh the page - your theme preference persists
- Check browser console to see localStorage updates

## Browser Compatibility
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (limited support, CSS variables not supported)

## Performance
- **Lighthouse Score:** 95+ Performance, 100 Accessibility
- **Load Time:** < 1 second on average connection
- **Assets:** Optimized images, minimal external dependencies
- **JavaScript:** Vanilla JS, no frameworks (lightweight)

## Contributing
This is a personal portfolio project. Feel free to fork and customize for your own use!

## License
MIT License - Free to use and modify

## Contact
- **GitHub:** [parthp137](https://github.com/parthp137)
- **Portfolio:** [https://parthp137.github.io/Portfolio/](https://parthp137.github.io/Portfolio/)

---

**Last Updated:** March 2026  
**Version:** 2.0.0 (with Dark/Light Theme Toggle)
