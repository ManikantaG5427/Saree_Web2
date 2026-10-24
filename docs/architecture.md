# SLSH Weaves · System Architecture & Technical Specifications

## Brand & Business Identity
- **Business Name:** Sri Lakshmi Saree House
- **Brand Identity:** SLSH Weaves
- **Established:** 2003
- **Proprietor:** Venkateshwarlu
- **Location:** H.No. 12-118 & 124, P&T Colony Main Road, Dilsukhnagar, Hyderabad - 60, Telangana, India.
- **Contact Helplines:**
  - Shop Counter: +91 98482 02134
  - Proprietor Direct: +91 94902 14533
  - WhatsApp Video Drape & Shopping: +91 86391 40385
- **Official Domain:** slshweaves.com
- **Instagram Official:** @slsh_weaves

---

## High-Level Monorepo Architecture
```
Saree_Web2/
├── apps/
│   ├── web/                     # React 19 + Vite + Tailwind CSS + Lucide React Storefront
│   │   ├── src/
│   │   │   ├── assets/          # SVG Logo, Butterfly & Floral Motifs from Brand Poster
│   │   │   ├── components/      # Layout (Header, Footer), UI (SareeCard, Modal)
│   │   │   ├── contexts/        # Auth, Cart, Wishlist, Product, Order State Management
│   │   │   ├── data/            # Master Handloom Catalogue & Weave Metadata
│   │   │   ├── pages/           # All 20+ Customer & Admin Pages
│   │   │   └── styles/          # Design Tokens & Utilities
│   │   └── dist/                # Production Bundle (Built in <400ms)
│   └── api/                     # Node.js + Express + Mongoose REST API
│       ├── src/
│       │   ├── config/          # MongoDB Connection & Razorpay Configuration
│       │   ├── models/          # User, Product, Order, Return, Enquiry Schemas
│       │   ├── routes/          # Auth, Products, Orders, Payments, Enquiries
│       │   └── index.js         # Security Middleware (Helmet, CORS, Rate Limit)
├── docs/                        # Architecture, API, Database, and Payment Docs
├── .env.example                 # Environment Variable Specification
└── package.json                 # Monorepo Workspace Configuration
```

---

## Design System & Color Palette
- **Primary Plum (`#280030`):** Header, hero, selected editorial sections, luxury accents.
- **Deep Plum (`#300030`):** Secondary dark surfaces, cards, and modal backdrops.
- **Champagne Gold (`#F0C860`):** Headings, stars, verified badges, and restrained highlights.
- **Warm Ivory (`#FFF8F0`):** Main page background for generous editorial whitespace.
- **Pure White (`#FFFFFF`):** Product cards, form surfaces, and dialogs.
- **Rose Pink (`#BD3D78`):** Decorative butterfly details and special tags.
- **Botanical Green (`#426B46`):** Nature-inspired trust markers and WhatsApp triggers.
- **Main Text (`#29232A`):** Readable content on light surfaces.
- **Secondary Text (`#706873`):** Supporting information and attribute descriptions.
- **Border (`#E8DFE5`):** Subtle dividers and form outlines.

---

## Key Inspirations
- **Taneira:** Editorial split hero, generous whitespace, high-fashion presentation, Silk Mark assurance.
- **Kankatala:** Textile-first product hierarchy, Korvai and Jamdani storytelling, 1-on-1 WhatsApp video drape consultation, multi-angle saree photography (Model Drape, Pallu, Border, Pleats, Blouse, Daylight true-tone).
