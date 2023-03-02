import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export default function FooterLayout({ style, links, logo, copyright }) {
  const data = [
    {
      title: "Medium",
      icon: "icons/medium.svg",
      link: "",
    },
    {
      title: "GirHub",
      icon: "icons/github.svg",
      link: "",
    },
    {
      title: "Twitter",
      icon: "icons/twitter.svg",
      link: "",
    },
    {
      title: "Telegram",
      icon: "icons/telegram.svg",
      link: "",
    },
    {
      title: "Discord",
      icon: "icons/discord.svg",
      link: "",
    },
    {
      title: "Docs",
      icon: "icons/medium.svg",
      link: "",
    },
  ];
  return (
    <>
      <div className={styles.social_container}>
        {data.map((item_, index) => (
          <div className={styles.social_item} key={index}>
            <img src={item_.icon} alt={item_.title} />
            <span>{item_.title}</span>
          </div>
        ))}
      </div>
      <footer
        className={clsx("footer", {
          "footer--dark": style === "dark",
        })}>
        <div className="container container-fluid">
          {links}
          {(logo || copyright) && (
            <div className="footer__bottom text--center">
              {logo && <div className="margin-bottom--sm">{logo}</div>}
              {copyright}
            </div>
          )}
        </div>
      </footer>
    </>
  );
}
