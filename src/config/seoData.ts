export const SITE_CONFIG = {
    name: "CITC",
    fullName: "Computer Engineering Innovation & Tech Club (CITC)",
    url: "https://citc.ncit.edu.np",
    description: "Computer Engineering Innovation & Tech Club at Nepal College of Information Technology - Innovate. Connect. Transform",
    logo: "https://citc.ncit.edu.np/favicon/favicon.ico",
    email: "citc@ncit.edu.np",
    foundingDate: "2025",
    location: {
        country: "NP",
        region: "Bagmati",
        city: "Lalitpur",
        coordinates: {
            latitude: "27.671419683136147",
            longitude: " 85.33875975286703"
        }
    },
    social: {
        github: "https://github.com/CITC-Club",
        facebook: "https://www.facebook.com/citc.ncit/",
        instagram: "https://www.instagram.com/citc.ncit",
        linkedin: "https://www.linkedin.com/company/citc-ncit"
    }
};

export const SEO_PAGES = {
    home: {
        title: "CITC | Tech Community at NCIT",
        description: "Join CITC (Computer Engineering Innovation & Tech Club) - the premier tech community at Nepal College of Information Technology. Discover workshops, events, hackathons, and networking opportunities for aspiring tech enthusiasts.",
        keywords: "CITC, computer club,ncit club,ncit tech club,ncit tech community, IT club, tech community, NCIT, Nepal College, workshops, hackathons, tech events, programming, coding club",
        ogImage: "/media/og-team.avif",
        path: "/"
    },
    team: {
        title: "Our Team - CITC | Meet the Club Leaders",
        description: "Meet the passionate team members of Computer Engineering Innovation & Tech Club (CITC) - Executive Committee, Mentors, Faculty Advisors, and Patron driving innovation and tech education.",
        keywords: "CITC team, computer club, tech club members, NCIT tech community, student tech leaders, executive committee",
        ogImage: "/media/og-team.avif",
        path: "/team"
    },
    events: {
        title: "Events & Workshops - CITC | Tech Events at NCIT",
        description: "Explore upcoming tech events and workshops at CITC. Join hackathons, coding competitions, seminars, and networking sessions to enhance your tech skills.",
        keywords: "tech events, workshops, hackathons, coding competitions, tech seminars, CITC events, NCIT tech community",
        ogImage: "/media/og-team.avif",
        path: "/events"
    },
    join: {
        title: "Join CITC - Club Membership Registration",
        description: "Reserve your spot and join CITC (Computer Engineering Innovation & Tech Club) at NCIT. Fill out our membership form to become part of our thriving tech community and access exclusive workshops, events, and networking opportunities.",
        keywords: "join CITC, club membership, CITC registration, tech club join, NCIT tech community membership, student club registration",
        ogImage: "/media/og-team.avif",
        path: "/join"
    }
} as const;

export const getPageSEO = (page: keyof typeof SEO_PAGES) => {
    const pageData = SEO_PAGES[page];
    const baseUrl = SITE_CONFIG.url;
    
    return {
        ...pageData,
        url: `${baseUrl}${pageData.path}`,
        siteName: SITE_CONFIG.name,
        author: SITE_CONFIG.fullName,
    };
};

export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.fullName,
    "alternateName": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": SITE_CONFIG.logo,
    "description": SITE_CONFIG.description,
    "foundingDate": SITE_CONFIG.foundingDate,
    "address": {
        "@type": "PostalAddress",
        "addressCountry": SITE_CONFIG.location.country,
        "addressLocality": SITE_CONFIG.location.city
    },
    "sameAs": Object.values(SITE_CONFIG.social)
});

export const getWebsiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_CONFIG.url}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
    }
});

export const getPersonSchema = (member: {
    name: string;
    email: string;
    photo?: string;
    title?: string;
    department?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        instagram?: string;
        facebook?: string;
        twitter?: string;
        website?: string;
    };
}) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": member.name,
    "email": member.email,
    ...(member.photo && { "image": member.photo }),
    ...(member.title && { "jobTitle": member.title }),
    ...(member.department && { "affiliation": member.department }),
    "sameAs": [
        ...(member.socials?.github ? [member.socials.github] : []),
        ...(member.socials?.linkedin ? [member.socials.linkedin] : []),
        ...(member.socials?.instagram ? [member.socials.instagram] : []),
        ...(member.socials?.facebook ? [member.socials.facebook] : []),
        ...(member.socials?.twitter ? [member.socials.twitter] : []),
        ...(member.socials?.website ? [member.socials.website] : [])
    ].filter(Boolean)
});

export const getEventSchema = (event: {
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    status: string;
    registration_link?: string;
}) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "image": event.image,
    "startDate": event.date,
    "startTime": event.time,
    "location": {
        "@type": "Place",
        "name": event.location,
        "address": {
            "@type": "PostalAddress",
            "addressCountry": SITE_CONFIG.location.country
        }
    },
    "eventStatus": event.status === 'running' || event.status === 'upcoming' 
        ? "https://schema.org/EventScheduled" 
        : "https://schema.org/EventPostponed",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "organizer": {
        "@type": "Organization",
        "name": SITE_CONFIG.fullName,
        "url": SITE_CONFIG.url
    },
    ...(event.registration_link && {
        "offers": {
            "@type": "Offer",
            "url": event.registration_link,
            "price": "0",
            "priceCurrency": "NPR",
            "availability": "https://schema.org/InStock",
            "validFrom": event.date
        }
    })
});

export const getMetaTags = (config: {
    title: string;
    description: string;
    url: string;
    image: string;
    keywords: string;
    type?: string;
}) => ({
    title: config.title,
    meta: {
        title: config.title,
        description: config.description,
        keywords: config.keywords,
        author: SITE_CONFIG.fullName,
        robots: "index, follow",
    },
    og: {
        type: config.type || "website",
        url: config.url,
        title: config.title,
        description: config.description,
        image: config.image,
        siteName: SITE_CONFIG.name,
    },
    twitter: {
        card: "summary_large_image",
        url: config.url,
        title: config.title,
        description: config.description,
        image: config.image,
    }
});
