import React, { useEffect, useState } from "react";
import { useTransition, animated, config } from "react-spring";
import { useHistory } from "react-router-dom";
import copyIcon from "../images/copyIcon.svg";
import twitter from "../images/twitter.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";
import firebase from "firebase/firebase";

import firebaseConfig from "../firebaseConfig";

const formData = [
  {
    label: "what’s your email id? ",
    placeholderText: "we will use this to send you the approval mail",
    description: "",
  },
  {
    label: "what’s your full name?",
    placeholderText: "is anyone ever actually John Doe?",
    description: "",
  },
  {
    label: "reserve your username ( you can change it later )",
    placeholderText: "johnny420",
    description: "",
  },
  {
    label: "where are you located?",
    placeholderText: "name of the country",
    description: "",
  },
  {
    label: "what’s your persona?",
    placeholderText: "designer, entrepreneur, developer",
    description:
      "We will verify and assign the closest persona, or add your suggestions into our database :)",
  },
];

let userFilledData = {
  "what’s your email id? ": "",
  "what’s your full name?": "",
  "reserve your username ( you can change it later )": "",
  "where are you located?": "",
  "what’s your persona?": "",
  referralCount: 1,
};

const questions = [
  "what’s your email id? ",
  "what’s your full name?",
  "reserve your username ( you can change it later )",
  "where are you located?",
  "what’s your persona?",
];

function InputFields(props) {
  const { label, placeholderText, description, mobile } = props;
  const [value, setValue] = useState(userFilledData[label]);

  const handleChange = (newVal) => {
    setValue(newVal.trim());
    userFilledData[label] = newVal;
  };
  return (
    <div
      className={mobile ? "input-field-wrapper-mobile" : "input-field-wrapper"}
    >
      <div className={mobile ? "field-label-mobile" : "field-label"}>
        {label}
      </div>
      <input
        className={mobile ? "input-field-mobile" : "input-field"}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholderText}
      />
      <div
        className={mobile ? "field-description-mobile" : "field-description"}
      >
        {description}
      </div>
    </div>
  );
}

function WaitListFormMobile(props) {
  const { mobile } = props;

  const [page, setPage] = useState(1);
  const nextPage = () => {
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
        setPage(3);
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

  return;
}

function Form(props) {
  const { page, mobile } = props;
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
    }
  }, [page]);

  const tweet = (link) => {
    let twitterParameters = [];

    twitterParameters.push("text=" + encodeURI("Bunndle App Tweet Trail."));
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
            return <InputFields {...data} mobile={mobile} />;
          })}
        </>
      );
      break;
    case 2:
      return (
        <>
          {formData.slice(3).map((data) => {
            return <InputFields {...data} mobile={mobile} />;
          })}
        </>
      );
      break;
    case 3:
      return (
        <>
          <div
            className={mobile ? "completed-text-1-mobile" : "completed-text-1"}
          >
            Thank you for registering. We will send you an email when your
            account is ready for your use :)
          </div>
          <div
            className={mobile ? "completed-text-2-mobile" : "completed-text-2"}
          >
            Meanwhile, share your referral code with your friends. We will move
            you up the waitlist.
          </div>
          <div className={mobile ? "referral-input-mobile" : "referral-input"}>
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
                <img className="referral-icon" src={copyIcon} />
              </CopyToClipboard>
              <img
                className="twitter-icon"
                src={twitter}
                onClick={() => tweet(referralLink)}
              />
            </div>
            {copied ? <div>Copied!!</div> : ""}
          </div>
        </>
      );
      break;
  }
}

function WaitListForm(props) {
  const { mobile } = props;
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

  if (mobile) {
    return (
      <div className="waitlist-form-wrapper-mobile">
        <div className="waitlist-right-side-mobile">
          <div className="form-title-mobile">
            {page === 3
              ? "Pre-registration complete"
              : "Step " + page + " out of 2"}
          </div>
          <div className="form-fields-wrapper-mobile">
            {transitions(
              (styles, item) =>
                item && (
                  <animated.div style={styles}>
                    <Form page={item} mobile={mobile} />
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
            <div className="waitlist-buttons-mobile">
              <button
                className="waitlist-back-button-mobile"
                onClick={() => prevPage()}
              >
                Back
              </button>
              <button
                className="waitlist-next-button-mobile"
                onClick={() => nextPage()}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

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
                  <Form page={item} mobile={mobile} />
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
