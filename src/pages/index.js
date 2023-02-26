import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./style.module.css";

const data = [
  {
    image: "img/fuse_basics.png",
    title: "Fuse Basics",
    description:
      "Get the essential information on the Fuse Network and how it works",
    link: "/docs/Intro to Fuse/",
  },
  {
    image: "img/developers.png",
    title: "Developers",
    description:
      "Info on how to build on Fuse, including API docs and code references",
    link: "/docs-developers/FuseStack/Fuse Stack",
  },
  {
    image: "img/tutorials.png",
    title: "Tutorials",
    description:
      "Step-by-step and guides on Fuse. Inc technical and non-technical turorials",
    href: "https://youtube.com/playlist?list=PLz-FWdV8_wNbduRj30srN5J4dutcIc9iN",
  },
  {
    image: "img/integration.png",
    title: "Integration",
    description: "Your one-stop shop for plugging into Fuse",
    link: "/docs-developers/FuseStack/Fuse Stack",
  },
  {
    image: "img/mobile.png",
    title: "Mobile",
    description: "Read more about the Fuse open-source wallet stack",
    // TODO: verify the link for Mibile card
    link: "/",
  },
  {
    image: "img/validators.png",
    title: "Validators",
    description: "Learn how staking works, and join as a validator",
    link: "/docs-validators/HowToBecomeAValidator/How to become a validator",
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="WELCOME" description="">
      <main className={styles.container}>
        {/* <img src="/logo.svg" alt="LOGO" /> */}
        <h1>Learn How to Build with Fuse</h1>
        <div className={styles.grid}>
          {data.map((dataItem, index) => (
            <ItemCard key={index} {...dataItem} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

const ItemCard = ({ href, image, title, link, description }) => {
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      target={href ? "_blank" : "_self"}
      href={href ? href : ""}
      to={link ? link : ""}>
      <div className={styles.card}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};
