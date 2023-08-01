"use client";
import styles from "./header.module.scss";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import Nav from "./Nav";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };

  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src="/images/logo.png"
        width={200}
        height={200}
        alt="logo"
        priority
      ></Image>
      <div onClick={menuHandler}>
      {menuOpen ? <FiX className={styles.menuIcon} /> : <FiMenu className={styles.menuIcon} />}
      </div>
      <Nav isOpen={menuOpen} />
    </header>
  );
}
