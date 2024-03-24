import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className="text-white bg-primary_light dark:bg-primary_dark flex justify-between gap-8 text-xs tracking-wider uppercase px-8 py-1 fixed bottom-0 right-0 w-full">
      <div>Faizan Shaikh © 2024</div>
      <div className="flex gap-4 font-sm">
        <NavLink target="blank_" to={"https://github.com/IronJosh786"}>
          <i class="ri-github-fill"></i>
        </NavLink>
        <NavLink
          target="blank_"
          to={"https://linkedin.com/in/faizan-ejaz-shaikh/"}
        >
          <i class="ri-linkedin-box-fill"></i>
        </NavLink>
        <NavLink target="blank_" to={"https://twitter.com/faizanejaz_"}>
          <i class="ri-twitter-x-line"></i>
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
