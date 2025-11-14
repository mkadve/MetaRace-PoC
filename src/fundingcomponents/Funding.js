import { Content } from "./Content";
import { FundingContext } from "./FundingContext";
import { Header } from "./Header";
import "./styleWalletbtn.css";
import "./styleMunityjoin.css";
import "./styleTabcontrol.css";
import "./styleEthereumModal.css";
import "./styleNfts.css";
import "./styleSlideModal.css";
import "./styleSlide.css";
import "./styleAvailablestaked.css";
import "./styleStakeSettingModal.css";
import "./styleHamburger.css";
import { useState } from "react";
export const Funding = () => {
  const [availableNfts, setAvailableNfts] = useState([]);
  const [stakedNfts, setStakedNfts] = useState([]);
  const [availableNftIds, setAvailableNftIds] = useState([]);
  const [stakedNftIds, setStakedNftIds] = useState([]);
  const [isStaked, setIsStaked] = useState([]);
  const [tokenId, setTokenId] = useState(0);
  const [currentStaked, setCurrentStaked] = useState(false);

  const resetTokenID = (tokenId) => {
    setTokenId(tokenId);
  }
  const resetCurrentStaked = (tokenId) => {
    setCurrentStaked(tokenId);
  }

  return (
    <div>
      <FundingContext.Provider
        value={{
          activeBtn: "left",
          connect: "false",
          isStaked: isStaked,
          availableNftIds: availableNftIds,
          availableNfts: availableNfts,
          stakedNftIds: stakedNftIds,
          stakedNfts: stakedNfts,
          tokenId: tokenId,
          resetTokenID: resetTokenID,
          currentStaked: currentStaked,
          resetCurrentStaked: resetCurrentStaked,
        }}
      >
        <Header />
        <Content />
      </FundingContext.Provider>
    </div>
  );
};
