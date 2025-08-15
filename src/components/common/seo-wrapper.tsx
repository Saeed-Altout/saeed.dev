import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  noIndex?: boolean;
  noFollow?: boolean;
}

export function SEO({
  title,
  description,
  keywords = [],
  author = "Saeed Al-Tout",
  image = "/og-image.jpg",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  twitterCard = "summary_large_image",
  noIndex = false,
  noFollow = false,
}: SEOProps) {
  const fullTitle = title.includes("Saeed Al-Tout")
    ? title
    : `${title} | Saeed Al-Tout`;
  const fullUrl = url
    ? `${window.location.origin}${url}`
    : window.location.href;
  const fullImage = image.startsWith("http")
    ? image
    : `${window.location.origin}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      property?: string
    ) => {
      let meta = document.querySelector(
        `meta[${property ? property : "name"}="${name}"]`
      ) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement("meta");
        if (property) {
          meta.setAttribute("property", property);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic Meta Tags
    updateMetaTag("description", description);
    updateMetaTag("author", author);
    updateMetaTag("keywords", keywords.join(", "));
    updateMetaTag(
      "robots",
      `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`
    );

    // Open Graph Meta Tags
    updateMetaTag("og:title", fullTitle, "property");
    updateMetaTag("og:description", description, "property");
    updateMetaTag("og:type", type, "property");
    updateMetaTag("og:url", fullUrl, "property");
    updateMetaTag("og:image", fullImage, "property");
    updateMetaTag("og:site_name", "Saeed Al-Tout Portfolio", "property");
    updateMetaTag("og:locale", "en_US", "property");

    // Twitter Card Meta Tags
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:title", fullTitle);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", fullImage);
    updateMetaTag("twitter:creator", "@saeed_altout");
    updateMetaTag("twitter:site", "@saeed_altout");

    // Additional Meta Tags
    updateMetaTag("viewport", "width=device-width, initial-scale=1");
    updateMetaTag("theme-color", "#000000");
    updateMetaTag("color-scheme", "light dark");

    // Conditional meta tags
    if (publishedTime) {
      updateMetaTag("article:published_time", publishedTime, "property");
    }

    if (modifiedTime) {
      updateMetaTag("article:modified_time", modifiedTime, "property");
    }

    if (section) {
      updateMetaTag("article:section", section, "property");
    }

    if (tags.length > 0) {
      tags.forEach((tag) => {
        updateMetaTag("article:tag", tag, "property");
      });
    }

    // Update canonical link
    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);

    // Add structured data
    const addStructuredData = (data: Record<string, unknown>, type: string) => {
      // Remove existing structured data of this type
      const existingScripts = document.querySelectorAll(
        `script[type="application/ld+json"]`
      );
      existingScripts.forEach((script) => {
        if (
          script.textContent &&
          script.textContent.includes(`"@type": "${type}"`)
        ) {
          script.remove();
        }
      });

      // Add new structured data
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(data);
      document.head.appendChild(script);
    };

    // Person structured data
    addStructuredData(
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Saeed Al-Tout",
        jobTitle: "Full Stack Developer",
        description:
          "Passionate Full Stack Developer with expertise in React, Node.js, and modern web technologies",
        url: "https://saeedaltout.com",
        sameAs: [
          "https://github.com/Saeed-Altout",
          "https://linkedin.com/in/saeed-altout",
          "https://twitter.com/saeed_altout",
        ],
        knowsAbout: [
          "React.js",
          "Node.js",
          "TypeScript",
          "Next.js",
          "Full Stack Development",
          "Web Development",
        ],
        worksFor: {
          "@type": "Organization",
          name: "Flexify",
        },
      },
      "Person"
    );

    // Website structured data
    addStructuredData(
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Saeed Al-Tout Portfolio",
        description:
          "Full Stack Developer Portfolio showcasing projects, skills, and experience",
        url: "https://saeedaltout.com",
        author: {
          "@type": "Person",
          name: "Saeed Al-Tout",
        },
        publisher: {
          "@type": "Person",
          name: "Saeed Al-Tout",
        },
      },
      "WebSite"
    );

    // Cleanup function
    return () => {
      // Reset title to default
      document.title = "Saeed Al-Tout - Full Stack Developer";
    };
  }, [
    fullTitle,
    description,
    keywords,
    author,
    fullUrl,
    fullImage,
    type,
    twitterCard,
    noIndex,
    noFollow,
    publishedTime,
    modifiedTime,
    section,
    tags,
  ]);

  // This component doesn't render anything visible
  return null;
}

SEO.displayName = "SEO";
