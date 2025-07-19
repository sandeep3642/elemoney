// public path version
export const getAMCIconPath = (name) => {
  if (!name) return '/assets/AMC-Icon/default-amc.svg';

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

  const lowerName = name.toLowerCase();
  const match = Object.keys(amcIconMap).find(key => lowerName.includes(key));
  if (!match) return '/assets/AMC-Icon/default-amc.svg';

  const folder = amcIconMap[match];
  return `/assests/AMC-Icon/${folder}.imageset/${folder}.svg`;
};
