# Sri Lakshmi Saree House (SLSH Weaves)
### Luxury Handloom E-Commerce Platform · MERN Stack with Razorpay

Built from the physical brand identity of **Sri Lakshmi Saree House (SLSH Weaves)**, established in 2003 in Hyderabad by proprietor Venkateshwarlu. Incorporates the refined editorial presentation of **Taneira** and the textile-first storytelling of **Kankatala**.

---

## Brand Details
- **Brand Name:** SLSH Weaves (Sri Lakshmi Saree House)
- **Tagline:** Woven in Tradition. Worn with Love.
- **Established:** 2003
- **Location:** H.No. 12-118 & 124, P&T Colony Main Road, Dilsukhnagar, Hyderabad - 60, Telangana, India.
- **Contact:**
  - Shop Counter: `+91 98482 02134`
  - Proprietor: `+91 94902 14533`
  - WhatsApp Shopping: `+91 86391 40385`
  - Instagram: `@slsh_weaves`
  - Website: `slshweaves.com`

---

## Core Brand Palette
- **Primary Plum:** `#280030`
- **Deep Plum:** `#300030`
- **Champagne Gold:** `#F0C860`
- **Warm Ivory:** `#FFF8F0`
- **Pure White:** `#FFFFFF`
- **Rose Pink:** `#BD3D78`
- **Botanical Green:** `#426B46`
- **Main Text:** `#29232A`
- **Border:** `#E8DFE5`

---

## Key Features
1. **Editorial Split Hero & Trust Strip:** Showcasing pure handloom Kanjeevarams, Silk Mark authenticity, and verified heritage.
2. **Interactive Saree Discovery Finder:** Filter seamlessly by Occasion, Weave Technique, and Price Budget.
3. **Multi-Angle Saree Photography Studio (`/admin`):**
   - Upload 1 to 6 angles from device or camera (Model Drape, Pallu Zari, Border Motif, Pleats, Blouse Piece, Daylight True Color).
   - Reorder sequence (Move Left/Right).
   - Mark primary Cover Photo with 1-click Gold Star.
   - Comprehensive handloom specifications.
4. **Textile Guide (`/handloom-guide`):** In-depth guides for Kanjeevaram Korvai, Uppada Jamdani, Banarasi Kadwa, Gadwal Kupadam, and Silk Mark authentication.
5. **WhatsApp Video Drape Integration:** Direct trigger for live 1-on-1 natural daylight video consultation.
6. **Full E-Commerce Journey:** Shopping Bag, Fall & Pico Hemming inclusion, Secure Checkout, Razorpay Integration, and Order Tracking.
7. **Protected Admin Management:** Real-time analytics, catalogue management, order status transitions, return approvals, and wholesale enquiries.

---

## Project Structure
```text
Saree_Web2/
├── client/          # Frontend Web Application (React 19, Vite, Tailwind CSS)
│   ├── src/         # Components, Pages, Contexts, Hooks, Assets
│   ├── public/      # Static Assets & Handloom Photography
│   └── package.json
├── server/          # Backend REST API (Node.js, Express, MongoDB, Razorpay)
│   ├── src/         # Routes, Controllers, Models, Middleware
│   └── package.json
├── package.json     # Root Monorepo configuration
└── vercel.json      # Production deployment configuration
```

---

## Quick Start
```bash
# Install all dependencies across client and server
npm install

# Run Client Frontend Storefront (Port 5174 or 5173)
npm run dev:client
# or: cd client && npm run dev

# Run Server Backend Express API (Port 5000)
npm run dev:server
# or: cd server && npm run dev

# Production Build Client
npm run build
```

### Admin Credentials
- **Email:** `admin@slshweaves.com`
- **Password:** `admin123`
- *(Auto-fill button available on `/login`)*
