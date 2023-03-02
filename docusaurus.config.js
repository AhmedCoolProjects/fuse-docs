// @ts-check

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "FUSE DOCS",
  tagline: "",
  url: "https://fuse.com",
  baseUrl: "/",
  onBrokenLinks: "ignore",
  onBrokenMarkdownLinks: "warn",
  favicon: "logo.svg",
  organizationName: "fuse",
  projectName: "docs",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-integration",
        path: "docs-integration",
        routeBasePath: "docs-integration",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-developers",
        path: "docs-developers",
        routeBasePath: "docs-developers",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-validators",
        path: "docs-validators",
        routeBasePath: "docs-validators",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-tools",
        path: "docs-tools",
        routeBasePath: "docs-tools",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-misc",
        path: "docs-misc",
        routeBasePath: "docs-misc",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "docs-network-health",
        path: "docs-network-health",
        routeBasePath: "docs-network-health",
        sidebarPath: require.resolve("./sidebars.js"),
      },
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig: {
    docs: { sidebar: { autoCollapseCategories: true } },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      logo: {
        alt: "FUSE",
        src: "logo_black.svg",
        width: 200,
      },
      items: [
        {
          type: "doc",
          docId: "Intro to Fuse/Intro to Fuse",
          position: "left",
          label: "Basics",
        },
        {
          to: "docs-developers/",
          position: "left",
          label: "Developers",
        },
        {
          to: "docs-validators/",
          position: "left",
          label: "Validators",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        // {
        //   title: "LINKS",
        //   items: [
        //     {
        //       label: "Join Mailling List",
        //       href: "https://cdn.forms-content.sg-form.com/d81bb4fc-c732-11e9-a6f6-de5802169549",
        //     },
        //     {
        //       label: "GitHub",
        //       href: "https://github.com/fuseio",
        //     },
        //     {
        //       label: "Blog",
        //       href: "https://news.fuse.io/",
        //     },
        //     {
        //       label: "Twitter",
        //       href: "https://twitter.com/fuse_network",
        //     },
        //     {
        //       label: "LinkedIn",
        //       href: "https://www.linkedin.com/company/fuseio/",
        //     },
        //     {
        //       label: "YouTube",
        //       href: "https://www.youtube.com/channel/UC7NaJ0UhmyHi5MvZSk61akA",
        //     },
        //     {
        //       label: "Discord",
        //       href: "https://discord.com/invite/jpPMeSZ",
        //     },
        //     {
        //       label: "Telegram",
        //       href: "https://t.me/fuseio",
        //     },
        //   ],
        // },
        {
          title: "Getting Started",
          items: [
            { label: "Fuse Studio", to: "/" },
            {
              label: "Fuse Staking",
              to: "/",
            },
            {
              label: "Fuse Swap",
              to: "/",
            },
            {
              label: "Fuse Cash",
              to: "/",
            },
          ],
        },
        {
          title: "Under the hood",
          items: [
            {
              label: "Fuse Network",
              to: "/",
            },
            {
              label: "Fuse Token",
              to: "/",
            },
            {
              label: "Explorer",
              to: "/",
            },
            {
              label: "Documentation",
              to: "/",
            },
            {
              label: "Service Status",
              to: "/",
            },
          ],
        },
        {
          title: "General",
          items: [
            {
              label: "About Us",
              to: "/",
            },
            {
              label: "Privacy Policy",
              to: "/",
            },
            {
              label: "Brand kit",
              to: "/",
            },
            {
              label: "Jobs",
              to: "/",
            },
          ],
        },
      ],

      copyright: `© 2021 Fuse. All Rights Reserved`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["solidity"],
    },
  },
};

module.exports = config;
