// src/utils/getIcon.js
export const getAMCIconPath = (name) => {
  if (!name) return '/src/assets/AMC-Icon/default-amc.svg';

  const amcIconMap = {
    "hdfc": "hdfc-mf",
    "aditya birla": "aditya-birla",
    "axis": "axis-mf",
    "bandhan": "bandhan",
    "bank of india": "bank-of-india",
    "baroda bnp paribas": "baroda-bnp-paribas",
    "canara robeco": "canara-robeco",
    "dsp": "dsp-mf",
    "edelweiss": "edelweiss",
    "franklin templeton": "franklin-templeton",
    "hsbc": "hsbc-mf",
    "icici": "icici-mf",
    "invesco": "invesco-mf",
    "jm financial": "jm-financial",
    "kotak": "kotak-mf",
    "lic": "lic-mf",
    "mahindra": "mahindra-manu",
    "mirae asset": "mirae-asset",
    "motilal oswal": "motilal-oswal",
    "navi": "navi-mf",
    "nippon": "nippon"
  };

  const key = name.toLowerCase();
  const folder = amcIconMap[key];
  if (!folder) return '/src/assets/AMC-Icon/default-amc.svg';

  return `/src/assets/AMC-Icon/${folder}.imageset/${folder}.svg`;
};
