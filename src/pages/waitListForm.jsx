import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "react-spring";
import { useHistory } from "react-router-dom";
import copyIcon from "../images/copyIcon.svg";
import twitter from "../images/twitter.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import firebase from "firebase/firebase";
import firebaseConfig from "../firebaseConfig";
import Creatable from "react-select/creatable";
import Select from "react-select";

const formData = [
  {
    label: "what’s your email id? ",
    placeholderText: "we will use this to send you the approval mail",
    description: "",
    dropDown: 0,
  },
  {
    label: "what’s your full name?",
    placeholderText: "is anyone ever actually John Doe?",
    description: "",
    dropDown: 0,
  },
  {
    label: "reserve your username ( you can change it later )",
    placeholderText: "johnny420",
    description: "",
    dropDown: 0,
  },
  {
    label: "where are you located?",
    placeholderText: "name of the country",
    description: "",
    dropDown: 1,
  },
  {
    label: "what’s your persona?",
    placeholderText: "designer, entrepreneur, developer",
    description:
      "We will verify and assign the closest persona, or add your suggestions into our database :)",
    dropDown: 2,
  },
];

let userFilledData = {
  "what’s your email id? ": "",
  "what’s your full name?": "",
  "reserve your username ( you can change it later )": "",
  "where are you located?": "",
  "what’s your persona?": "",
  referralCount: [],
};

const questions = [
  "what’s your email id? ",
  "what’s your full name?",
  "reserve your username ( you can change it later )",
  "where are you located?",
  "what’s your persona?",
];

const countries = [
  { label: "Afghanistan", code: "AF", value: "Afghanistan" },
  { label: "Albania", code: "AL", value: "Albania" },
  { label: "Algeria", code: "DZ", value: "Algeria" },
  { label: "American Samoa", code: "AS", value: "American Samoa" },
  { label: "AndorrA", code: "AD", value: "AndorrA" },
  { label: "Angola", code: "AO", value: "Angola" },
  { label: "Anguilla", code: "AI", value: "Anguilla" },
  { label: "Antarctica", code: "AQ", value: "Antarctica" },
  { label: "Antigua and Barbuda", code: "AG", value: "Antigua and Barbuda" },
  { label: "Argentina", code: "AR", value: "Argentina" },
  { label: "Armenia", code: "AM", value: "Armenia" },
  { label: "Aruba", code: "AW", value: "Aruba" },
  { label: "Australia", code: "AU", value: "Australia" },
  { label: "Austria", code: "AT", value: "Austria" },
  { label: "Azerbaijan", code: "AZ", value: "Azerbaijan" },
  { label: "Bahamas", code: "BS", value: "Bahamas" },
  { label: "Bahrain", code: "BH", value: "Bahrain" },
  { label: "Bangladesh", code: "BD", value: "Bangladesh" },
  { label: "Barbados", code: "BB", value: "Barbados" },
  { label: "Belarus", code: "BY", value: "Belarus" },
  { label: "Belgium", code: "BE", value: "Belgium" },
  { label: "Belize", code: "BZ", value: "Belize" },
  { label: "Benin", code: "BJ", value: "Benin" },
  { label: "Bermuda", code: "BM", value: "Bermuda" },
  { label: "Bhutan", code: "BT", value: "Bhutan" },
  { label: "Bolivia", code: "BO", value: "Bolivia" },
  {
    label: "Bosnia and Herzegovina",
    code: "BA",
    value: "Bosnia and Herzegovina",
  },
  { label: "Botswana", code: "BW", value: "Botswana" },
  { label: "Bouvet Island", code: "BV", value: "Bouvet Island" },
  { label: "Brazil", code: "BR", value: "Brazil" },
  {
    label: "British Indian Ocean Territory",
    code: "IO",
    value: "British Indian Ocean Territory",
  },
  { label: "Brunei Darussalam", code: "BN", value: "Brunei Darussalam" },
  { label: "Bulgaria", code: "BG", value: "Bulgaria" },
  { label: "Burkina Faso", code: "BF", value: "Burkina Faso" },
  { label: "Burundi", code: "BI", value: "Burundi" },
  { label: "Cambodia", code: "KH", value: "Cambodia" },
  { label: "Cameroon", code: "CM", value: "Cameroon" },
  { label: "Canada", code: "CA", value: "Canada" },
  { label: "Cape Verde", code: "CV", value: "Cape Verde" },
  { label: "Cayman Islands", code: "KY", value: "Cayman Islands" },
  {
    label: "Central African Republic",
    code: "CF",
    value: "Central African Republic",
  },
  { label: "Chad", code: "TD", value: "Chad" },
  { label: "Chile", code: "CL", value: "Chile" },
  { label: "China", code: "CN", value: "China" },
  { label: "Christmas Island", code: "CX", value: "Christmas Island" },
  {
    label: "Cocos (Keeling) Islands",
    code: "CC",
    value: "Cocos (Keeling) Islands",
  },
  { label: "Colombia", code: "CO", value: "Colombia" },
  { label: "Comoros", code: "KM", value: "Comoros" },
  { label: "Congo", code: "CG", value: "Congo" },
  {
    label: "Congo, The Democratic Republic of the",
    code: "CD",
    value: "Congo, The Democratic Republic of the",
  },
  { label: "Cook Islands", code: "CK", value: "Cook Islands" },
  { label: "Costa Rica", code: "CR", value: "Costa Rica" },
  { label: "Cote D'Ivoire", code: "CI", value: "Cote D'Ivoire" },
  { label: "Croatia", code: "HR", value: "Croatia" },
  { label: "Cuba", code: "CU", value: "Cuba" },
  { label: "Cyprus", code: "CY", value: "Cyprus" },
  { label: "Czech Republic", code: "CZ", value: "Czech Republic" },
  { label: "Denmark", code: "DK", value: "Denmark" },
  { label: "Djibouti", code: "DJ", value: "Djibouti" },
  { label: "Dominica", code: "DM", value: "Dominica" },
  { label: "Dominican Republic", code: "DO", value: "Dominican Republic" },
  { label: "Ecuador", code: "EC", value: "Ecuador" },
  { label: "Egypt", code: "EG", value: "Egypt" },
  { label: "El Salvador", code: "SV", value: "El Salvador" },
  { label: "Equatorial Guinea", code: "GQ", value: "Equatorial Guinea" },
  { label: "Eritrea", code: "ER", value: "Eritrea" },
  { label: "Estonia", code: "EE", value: "Estonia" },
  { label: "Ethiopia", code: "ET", value: "Ethiopia" },
  {
    label: "Falkland Islands (Malvinas)",
    code: "FK",
    value: "Falkland Islands (Malvinas)",
  },
  { label: "Faroe Islands", code: "FO", value: "Faroe Islands" },
  { label: "Fiji", code: "FJ", value: "Fiji" },
  { label: "Finland", code: "FI", value: "Finland" },
  { label: "France", code: "FR", value: "France" },
  { label: "French Guiana", code: "GF", value: "French Guiana" },
  { label: "French Polynesia", code: "PF", value: "French Polynesia" },
  {
    label: "French Southern Territories",
    code: "TF",
    value: "French Southern Territories",
  },
  { label: "Gabon", code: "GA", value: "Gabon" },
  { label: "Gambia", code: "GM", value: "Gambia" },
  { label: "Georgia", code: "GE", value: "Georgia" },
  { label: "Germany", code: "DE", value: "Germany" },
  { label: "Ghana", code: "GH", value: "Ghana" },
  { label: "Gibraltar", code: "GI", value: "Gibraltar" },
  { label: "Greece", code: "GR", value: "Greece" },
  { label: "Greenland", code: "GL", value: "Greenland" },
  { label: "Grenada", code: "GD", value: "Grenada" },
  { label: "Guadeloupe", code: "GP", value: "Guadeloupe" },
  { label: "Guam", code: "GU", value: "Guam" },
  { label: "Guatemala", code: "GT", value: "Guatemala" },
  { label: "Guernsey", code: "GG", value: "Guernsey" },
  { label: "Guinea", code: "GN", value: "Guinea" },
  { label: "Guinea-Bissau", code: "GW", value: "Guinea-Bissau" },
  { label: "Guyana", code: "GY", value: "Guyana" },
  { label: "Haiti", code: "HT", value: "Haiti" },
  {
    label: "Heard Island and Mcdonald Islands",
    code: "HM",
    value: "Heard Island and Mcdonald Islands",
  },
  {
    label: "Holy See (Vatican City State)",
    code: "VA",
    value: "Holy See (Vatican City State)",
  },
  { label: "Honduras", code: "HN", value: "Honduras" },
  { label: "Hong Kong", code: "HK", value: "Hong Kong" },
  { label: "Hungary", code: "HU", value: "Hungary" },
  { label: "Iceland", code: "IS", value: "Iceland" },
  { label: "India", code: "IN", value: "India" },
  { label: "Indonesia", code: "ID", value: "Indonesia" },
  {
    label: "Iran, Islamic Republic Of",
    code: "IR",
    value: "Iran, Islamic Republic Of",
  },
  { label: "Iraq", code: "IQ", value: "Iraq" },
  { label: "Ireland", code: "IE", value: "Ireland" },
  { label: "Isle of Man", code: "IM", value: "Isle of Man" },
  { label: "Israel", code: "IL", value: "Israel" },
  { label: "Italy", code: "IT", value: "Italy" },
  { label: "Jamaica", code: "JM", value: "Jamaica" },
  { label: "Japan", code: "JP", value: "Japan" },
  { label: "Jersey", code: "JE", value: "Jersey" },
  { label: "Jordan", code: "JO", value: "Jordan" },
  { label: "Kazakhstan", code: "KZ", value: "Kazakhstan" },
  { label: "Kenya", code: "KE", value: "Kenya" },
  { label: "Kiribati", code: "KI", value: "Kiribati" },
  {
    label: "Korea, Democratic People'S Republic of",
    code: "KP",
    value: "Korea, Democratic People'S Republic of",
  },
  { label: "Korea, Republic of", code: "KR", value: "Korea, Republic of" },
  { label: "Kuwait", code: "KW", value: "Kuwait" },
  { label: "Kyrgyzstan", code: "KG", value: "Kyrgyzstan" },
  {
    label: "Lao People'S Democratic Republic",
    code: "LA",
    value: "Lao People'S Democratic Republic",
  },
  { label: "Latvia", code: "LV", value: "Latvia" },
  { label: "Lebanon", code: "LB", value: "Lebanon" },
  { label: "Lesotho", code: "LS", value: "Lesotho" },
  { label: "Liberia", code: "LR", value: "Liberia" },
  {
    label: "Libyan Arab Jamahiriya",
    code: "LY",
    value: "Libyan Arab Jamahiriya",
  },
  { label: "Liechtenstein", code: "LI", value: "Liechtenstein" },
  { label: "Lithuania", code: "LT", value: "Lithuania" },
  { label: "Luxembourg", code: "LU", value: "Luxembourg" },
  { label: "Macao", code: "MO", value: "Macao" },
  {
    label: "Macedonia, The Former Yugoslav Republic of",
    code: "MK",
    value: "Macedonia, The Former Yugoslav Republic of",
  },
  { label: "Madagascar", code: "MG", value: "Madagascar" },
  { label: "Malawi", code: "MW", value: "Malawi" },
  { label: "Malaysia", code: "MY", value: "Malaysia" },
  { label: "Maldives", code: "MV", value: "Maldives" },
  { label: "Mali", code: "ML", value: "Mali" },
  { label: "Malta", code: "MT", value: "Malta" },
  { label: "Marshall Islands", code: "MH", value: "Marshall Islands" },
  { label: "Martinique", code: "MQ", value: "Martinique" },
  { label: "Mauritania", code: "MR", value: "Mauritania" },
  { label: "Mauritius", code: "MU", value: "Mauritius" },
  { label: "Mayotte", code: "YT", value: "Mayotte" },
  { label: "Mexico", code: "MX", value: "Mexico" },
  {
    label: "Micronesia, Federated States of",
    code: "FM",
    value: "Micronesia, Federated States of",
  },
  { label: "Moldova, Republic of", code: "MD", value: "Moldova, Republic of" },
  { label: "Monaco", code: "MC", value: "Monaco" },
  { label: "Mongolia", code: "MN", value: "Mongolia" },
  { label: "Montserrat", code: "MS", value: "Montserrat" },
  { label: "Morocco", code: "MA", value: "Morocco" },
  { label: "Mozambique", code: "MZ", value: "Mozambique" },
  { label: "Myanmar", code: "MM", value: "Myanmar" },
  { label: "Namibia", code: "NA", value: "Namibia" },
  { label: "Nauru", code: "NR", value: "Nauru" },
  { label: "Nepal", code: "NP", value: "Nepal" },
  { label: "Netherlands", code: "NL", value: "Netherlands" },
  { label: "Netherlands Antilles", code: "AN", value: "Netherlands Antilles" },
  { label: "New Caledonia", code: "NC", value: "New Caledonia" },
  { label: "New Zealand", code: "NZ", value: "New Zealand" },
  { label: "Nicaragua", code: "NI", value: "Nicaragua" },
  { label: "Niger", code: "NE", value: "Niger" },
  { label: "Nigeria", code: "NG", value: "Nigeria" },
  { label: "Niue", code: "NU", value: "Niue" },
  { label: "Norfolk Island", code: "NF", value: "Norfolk Island" },
  {
    label: "Northern Mariana Islands",
    code: "MP",
    value: "Northern Mariana Islands",
  },
  { label: "Norway", code: "NO", value: "Norway" },
  { label: "Oman", code: "OM", value: "Oman" },
  { label: "Pakistan", code: "PK", value: "Pakistan" },
  { label: "Palau", code: "PW", value: "Palau" },
  {
    label: "Palestinian Territory, Occupied",
    code: "PS",
    value: "Palestinian Territory, Occupied",
  },
  { label: "Panama", code: "PA", value: "Panama" },
  { label: "Papua New Guinea", code: "PG", value: "Papua New Guinea" },
  { label: "Paraguay", code: "PY", value: "Paraguay" },
  { label: "Peru", code: "PE", value: "Peru" },
  { label: "Philippines", code: "PH", value: "Philippines" },
  { label: "Pitcairn", code: "PN", value: "Pitcairn" },
  { label: "Poland", code: "PL", value: "Poland" },
  { label: "Portugal", code: "PT", value: "Portugal" },
  { label: "Puerto Rico", code: "PR", value: "Puerto Rico" },
  { label: "Qatar", code: "QA", value: "Qatar" },
  { label: "Reunion", code: "RE", value: "Reunion" },
  { label: "Romania", code: "RO", value: "Romania" },
  { label: "Russian Federation", code: "RU", value: "Russian Federation" },
  { label: "RWANDA", code: "RW", value: "RWANDA" },
  { label: "Saint Helena", code: "SH", value: "Saint Helena" },
  {
    label: "Saint Kitts and Nevis",
    code: "KN",
    value: "Saint Kitts and Nevis",
  },
  { label: "Saint Lucia", code: "LC", value: "Saint Lucia" },
  {
    label: "Saint Pierre and Miquelon",
    code: "PM",
    value: "Saint Pierre and Miquelon",
  },
  {
    label: "Saint Vincent and the Grenadines",
    code: "VC",
    value: "Saint Vincent and the Grenadines",
  },
  { label: "Samoa", code: "WS", value: "Samoa" },
  { label: "San Marino", code: "SM", value: "San Marino" },
  {
    label: "Sao Tome and Principe",
    code: "ST",
    value: "Sao Tome and Principe",
  },
  { label: "Saudi Arabia", code: "SA", value: "Saudi Arabia" },
  { label: "Senegal", code: "SN", value: "Senegal" },
  {
    label: "Serbia and Montenegro",
    code: "CS",
    value: "Serbia and Montenegro",
  },
  { label: "Seychelles", code: "SC", value: "Seychelles" },
  { label: "Sierra Leone", code: "SL", value: "Sierra Leone" },
  { label: "Singapore", code: "SG", value: "Singapore" },
  { label: "Slovakia", code: "SK", value: "Slovakia" },
  { label: "Slovenia", code: "SI", value: "Slovenia" },
  { label: "Solomon Islands", code: "SB", value: "Solomon Islands" },
  { label: "Somalia", code: "SO", value: "Somalia" },
  { label: "South Africa", code: "ZA", value: "South Africa" },
  {
    label: "South Georgia and the South Sandwich Islands",
    code: "GS",
    value: "South Georgia and the South Sandwich Islands",
  },
  { label: "Spain", code: "ES", value: "Spain" },
  { label: "Sri Lanka", code: "LK", value: "Sri Lanka" },
  { label: "Sudan", code: "SD", value: "Sudan" },
  { label: "Suriname", code: "SR", value: "Suriname" },
  {
    label: "Svalbard and Jan Mayen",
    code: "SJ",
    value: "Svalbard and Jan Mayen",
  },
  { label: "Swaziland", code: "SZ", value: "Swaziland" },
  { label: "Sweden", code: "SE", value: "Sweden" },
  { label: "Switzerland", code: "CH", value: "Switzerland" },
  { label: "Syrian Arab Republic", code: "SY", value: "Syrian Arab Republic" },
  {
    label: "Taiwan, Province of China",
    code: "TW",
    value: "Taiwan, Province of China",
  },
  { label: "Tajikistan", code: "TJ", value: "Tajikistan" },
  {
    label: "Tanzania, United Republic of",
    code: "TZ",
    value: "Tanzania, United Republic of",
  },
  { label: "Thailand", code: "TH", value: "Thailand" },
  { label: "Timor-Leste", code: "TL", value: "Timor-Leste" },
  { label: "Togo", code: "TG", value: "Togo" },
  { label: "Tokelau", code: "TK", value: "Tokelau" },
  { label: "Tonga", code: "TO", value: "Tonga" },
  { label: "Trinidad and Tobago", code: "TT", value: "Trinidad and Tobago" },
  { label: "Tunisia", code: "TN", value: "Tunisia" },
  { label: "Turkey", code: "TR", value: "Turkey" },
  { label: "Turkmenistan", code: "TM", value: "Turkmenistan" },
  {
    label: "Turks and Caicos Islands",
    code: "TC",
    value: "Turks and Caicos Islands",
  },
  { label: "Tuvalu", code: "TV", value: "Tuvalu" },
  { label: "Uganda", code: "UG", value: "Uganda" },
  { label: "Ukraine", code: "UA", value: "Ukraine" },
  { label: "United Arab Emirates", code: "AE", value: "United Arab Emirates" },
  { label: "United Kingdom", code: "GB", value: "United Kingdom" },
  { label: "United States", code: "US", value: "United States" },
  {
    label: "United States Minor Outlying Islands",
    code: "UM",
    value: "United States Minor Outlying Islands",
  },
  { label: "Uruguay", code: "UY", value: "Uruguay" },
  { label: "Uzbekistan", code: "UZ", value: "Uzbekistan" },
  { label: "Vanuatu", code: "VU", value: "Vanuatu" },
  { label: "Venezuela", code: "VE", value: "Venezuela" },
  { label: "Viet Nam", code: "VN", value: "Viet Nam" },
  {
    label: "Virgin Islands, British",
    code: "VG",
    value: "Virgin Islands, British",
  },
  { label: "Virgin Islands, U.S.", code: "VI", value: "Virgin Islands, U.S." },
  { label: "Wallis and Futuna", code: "WF", value: "Wallis and Futuna" },
  { label: "Western Sahara", code: "EH", value: "Western Sahara" },
  { label: "Yemen", code: "YE", value: "Yemen" },
  { label: "Zambia", code: "ZM", value: "Zambia" },
  { label: "Zimbabwe", code: "ZW", value: "Zimbabwe" },
];

const personas = [
  { label: "developer", value: "developer" },
  { label: "designer", value: "designer" },
  { label: "entrepreneur", value: "entrepreneur" },
];

function InputFields(props) {
  const { label, placeholderText, description, dropDown } = props;
  const [value, setValue] = useState(userFilledData[label]);

  const handleChange = (newVal) => {
    setValue(newVal.trim());
    userFilledData[label] = newVal;
  };

  const handleTypeSelect = (e) => {
    userFilledData[label] = e.label;
    setValue(e.label);
  };
  return (
    <div className="input-field-wrapper">
      <div className="field-label">{label}</div>
      {dropDown > 0 ? (
        dropDown === 1 ? (
          <Select
            className="dropDown-container"
            options={countries}
            onChange={handleTypeSelect}
            value={countries.filter(function (option) {
              return option.label === value;
            })}
          />
        ) : (
          <Creatable
            className="dropDown-container"
            options={personas}
            onChange={handleTypeSelect}
            value={personas.filter(function (option) {
              return option.label === value;
            })}
            formatCreateLabel={(val) => "Add persona : " + val}
          />
        )
      ) : (
        <input
          className="input-field"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholderText}
        />
      )}

      <div className="field-description">{description}</div>
    </div>
  );
}

function Form(props) {
  const referralId = sessionStorage.getItem("referralId");
  const { page } = props;
  const [referralLink, setLink] = useState(
    "http://bunndle.vercel.app/referral/"
  );
  const [copied, setCopied] = useState(false);

  const toggleCopied = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    if (page === 3) {
      const pushedId = firebase.database().ref("users").push(userFilledData);
      console.log("DATA check : ", userFilledData);
      console.log("ID : ", pushedId.key);
      setLink(referralLink + pushedId.key);
      try {
        firebase
          .database()
          .ref("users/" + referralId + "/referralCount")
          .push(pushedId.key);
        sessionStorage.removeItem("referralId");
      } catch (error) {
        console.log("error Encountered", error);
      }
    }
  }, [page]);

  const tweet = (link) => {
    let twitterParameters = [];

    twitterParameters.push(
      "text=" +
        encodeURI(
          `Use your existing digital social spaces to create a growing network of friends and professionals.\nClick this link, to move up the waitlist : `
        )
    );
    twitterParameters.push("url=" + encodeURI(link));

    const url =
      "https://twitter.com/intent/tweet?" + twitterParameters.join("&");
    console.log(url);
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  switch (page) {
    case 1:
      return (
        <>
          {formData.slice(0, 3).map((data) => {
            return <InputFields {...data} />;
          })}
        </>
      );
    case 2:
      return (
        <>
          {formData.slice(3).map((data) => {
            return <InputFields {...data} />;
          })}
        </>
      );
    case 3:
      return (
        <>
          <div className="completed-text-1">
            Thank you for registering. We will send you an email when your
            account is ready for your use :)
          </div>
          <div className="completed-text-2">
            Meanwhile, share your referral code with your friends. We will move
            you up the waitlist.
          </div>
          <div className="referral-input">
            <div className="referral-wrapper">
              <input
                type="text"
                className="referral"
                value={referralLink}
                readOnly
              />
              <CopyToClipboard
                text={referralLink}
                onCopy={() => toggleCopied()}
              >
                <img alt="" className="referral-icon" src={copyIcon} />
              </CopyToClipboard>
              <img
                alt=""
                className="twitter-icon"
                src={twitter}
                onClick={() => tweet(referralLink)}
              />
            </div>
            {copied ? <div>Copied!!</div> : ""}
          </div>
        </>
      );
    default:
      return "";
  }
}

function WaitListForm(props) {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [fillFields, setFillFields] = useState(false);

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  }, []);

  const nextPage = () => {
    if (page === 1) {
      for (let i = 0; i < 3; i++) {
        if (userFilledData[questions[i]].length === 0) {
          // show unfilled data
          setFillFields(true);
          setTimeout(() => {
            setFillFields(false);
          }, 3000);
          return;
        }
      }
    } else if (page === 2) {
      for (let i = 3; i < 5; i++) {
        if (userFilledData[questions[i]].length === 0) {
          // show unfilled data
          setFillFields(true);
          setTimeout(() => {
            setFillFields(false);
          }, 3000);
          return;
        }
      }
    }

    setTimeout(() => {
      if (page === 3) {
        setPage(1);
      } else {
        setPage(page + 1);
      }
    });
  };

  const prevPage = () => {
    setTimeout(() => {
      if (page === 1) {
        history.goBack();
      } else {
        setPage(page - 1);
      }
    });
  };

  const transitions = useTransition(page, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    config: config.default,
  });

  return (
    <div className="waitlist-form-wrapper">
      <div className="waitlist-left-side"></div>
      <div className="waitlist-right-side">
        <div className="form-title">
          {page === 3
            ? "Pre-registration complete"
            : "Step " + page + " out of 2"}
        </div>
        <div className="form-fields-wrapper">
          {transitions(
            (styles, item) =>
              item && (
                <animated.div style={styles}>
                  <Form page={item} />
                </animated.div>
              )
          )}
        </div>
        {fillFields ? (
          <div style={{ color: "red", marginLeft: "20px" }}>
            Some Fields are missing...
          </div>
        ) : (
          ""
        )}
        {page === 3 ? (
          ""
        ) : (
          <div className="waitlist-buttons">
            <span className="waitlist-back-button" onClick={() => prevPage()}>
              Back
            </span>
            <button className="waitlist-next-button" onClick={() => nextPage()}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

WaitListForm.propTypes = {};
export default WaitListForm;
