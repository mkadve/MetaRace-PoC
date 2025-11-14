import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Funding } from "./fundingcomponents/Funding";
import "./landingcomponents/styleTop.css";
import "./landingcomponents/styleMunityhub.css";
import "./landingcomponents/styleGame.css";
import "./landingcomponents/styleMetahorse.css";
import "./landingcomponents/styleDao.css";
import "./landingcomponents/styleLegendary.css";
import "./landingcomponents/styleMunityprog.css";
import "./landingcomponents/styleArt.css";
import "./landingcomponents/stylePartners.css";
import "./landingcomponents/styleMunitynew.css";
import "./landingcomponents/styleMunityadd.css";
import "./landingcomponents/styleFooter.css";
import "./landingcomponents/styleSlides.css";
import "./landingcomponents/styleDataFeed.css";
import "./landingcomponents/styleLandingPage.css";
import { MyContext } from "./landingcomponents/MyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LandingPage } from "./landingcomponents/LandingPage";
const App = () => {
  const setAlert = (obj) => {
    if (obj.status === "success")
      toast.success(obj.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    else
      toast.error(obj.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
  };
  return (
    <div className="App">
        <MyContext.Provider value={{ setAlert }}>
          <ToastContainer toastStyle={{ backgroundColor: "#7936d9" }} />
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="token" element={<Funding />} />
            </Routes>
          </Router>
        </MyContext.Provider>
    </div>
  );
};

export default App;
