import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./style.module.css";

const data = [
  {
    image: "img/img1.svg",
    imageHover: "img/img7.svg",
    title: "Fuse Basics",
    description:
      "Getting all thr essential information  on tje fuse network and how and ir works.",
    link: "/docs/category/intro-to-fuse",
  },
  {
    image: "img/img2.svg",
    imageHover: "img/img8.svg",
    title: "Developers",
    description:
      "Info on how to build on fuse, including API docs and code references.",
    link: "/docs-developers/Overview",
  },
  {
    image: "img/img3.svg",
    imageHover: "img/img9.svg",
    title: "Tutorials",
    description:
      "Step by step and guides on Fuse. Inc technical and non  technical tutorials.",
    link: "/docs/Intro to Fuse/",
  },
  {
    image: "img/img4.svg",
    imageHover: "img/img10.svg",
    title: "Integration",
    description:
      "your one stop shop for plugging into Fuse, get everything you need for integration on one page.",
    link: "/docs/Intro to Fuse/",
  },
  {
    image: "img/img5.svg",
    imageHover: "img/img11.svg",
    title: "Mobile",
    description:
      "Read more about the fuse open source wallet stack built for the best crypto experience on mobile. ",
    link: "/docs/Intro to Fuse/",
  },
  {
    image: "img/img6.svg",
    imageHover: "img/img12.svg",
    title: "Validators",
    description:
      "See behind the scenes of Fuse, Learn how staking works and join as a validator.",
    link: "/docs/Intro to Fuse/",
  },
];

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="WELCOME" description="">
      <main className={styles.container}>
        <header>
          <h1>
            Learn How to Build
            <br /> with Fuse
          </h1>
          <p>
            Fuse strives to be the most business and consumer-friendly
            blockchain ecosystem for the mainstream adoption of Web3 payments. A
            fast and low-cost EVM-compatible Fuse Network blockchain powers
            fuse.
          </p>
        </header>

        <div className={styles.grid}>
          {data.map((dataItem, index) => (
            <ItemCard key={index} {...dataItem} />
          ))}
        </div>
      </main>
    </Layout>
  );
}

const ItemCard = ({ href, image, imageHover, title, link, description }) => {
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
        <div>
          <img src={image} alt={title} />
          <img src={imageHover} alt={title} />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};
