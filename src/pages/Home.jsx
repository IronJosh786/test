import React from "react";
import LeftBar from "../components/Leftbar.jsx";
import Rightbar from "../components/Rightbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

function Home() {
  return (
    <div className="grid lg:grid-cols-12">
      <LeftBar />
      <Outlet />
      <Rightbar />
      <Footer />
    </div>
  );
}

export default Home;
