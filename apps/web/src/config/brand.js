/**
 * SLSH WEAVES — Central Brand Configuration
 * Sri Lakshmi Saree House, Dilsukhnagar, Hyderabad
 *
 * ⚠️  VERIFIED DETAILS ONLY — All information here was extracted from the
 *     official brand poster and confirmed by the business proprietor.
 *     Update this file when the business provides new information.
 *     Never invent email addresses, store hours, certifications,
 *     testimonials, or shipping/return policies here.
 */

export const BRAND = {
  /** Official business name */
  fullName: 'Sri Lakshmi Saree House',
  /** Short brand identity */
  shortName: 'SLSH Weaves',
  /** Brand tagline */
  tagline: 'Woven in Tradition. Worn with Love.',
  /** Core brand idea */
  subTagline: 'Every Weave Has a Story.',
  /** Year established */
  established: 2003,
  /** Business type */
  specialization: 'Handloom Pattu Sarees · Wholesale & Retail',

  contact: {
    /** Proprietor contact (verified from poster) */
    proprietor: '+91 94902 14533',
    /** Main shop landline / number (verified from poster) */
    shop: '+91 98482 02134',
    /** WhatsApp shopping & video drape (verified from poster) */
    whatsapp: '+91 86391 40385',
    /** WhatsApp number without formatting for wa.me links */
    whatsappRaw: '918639140385',
    /** Website */
    website: 'slshweaves.com',
    /** Instagram handle (verified from poster) */
    instagram: '@slsh_weaves',
    /** Instagram URL */
    instagramUrl: 'https://www.instagram.com/slsh_weaves/',
    /** YouTube — update when confirmed */
    youtubeUrl: null,
    /** Facebook — update when confirmed */
    facebookUrl: null,
    /**
     * Email — NOT provided on the poster; set to null until the business
     * provides a verified address. Do NOT invent one.
     */
    email: null,
  },

  address: {
    line1: 'H.No. 12-118 & 124',
    line2: "P&T Colony Main Road",
    area: 'Dilsukhnagar',
    city: 'Hyderabad',
    pincode: '500036',
    state: 'Telangana',
    country: 'India',
    /** Formatted for display */
    full: 'H.No. 12-118 & 124, P&T Colony Main Road, Dilsukhnagar, Hyderabad - 60, Telangana, India.',
    /** Google Maps directions link */
    mapsUrl: 'https://maps.google.com/?q=Dilsukhnagar,+Hyderabad,+Telangana+500036',
  },

  proprietor: {
    name: 'Venkateshwarlu',
    contact: '+91 94902 14533',
  },

  /**
   * Store hours — NOT confirmed by the business.
   * Do NOT display these until approved.
   */
  storeHours: null,

  /** WhatsApp pre-filled messages */
  whatsappMessages: {
    general: 'Hello Sri Lakshmi Saree House, I would like to enquire about your sarees.',
    videoDrape: 'Hi Sri Lakshmi Saree House, I would like to book a 1-on-1 Video Drape call.',
    wholesale: 'Hi Sri Lakshmi Saree House, I am interested in wholesale / bulk purchasing. Please share details.',
    product: (name) =>
      `Hi Sri Lakshmi Saree House, I am interested in the ${name}. Please share availability and price.`,
  },
};

/** Utility: build a wa.me link with an optional pre-filled message */
export function waLink(message = BRAND.whatsappMessages.general) {
  return `https://wa.me/${BRAND.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
