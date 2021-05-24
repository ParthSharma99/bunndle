import React, { useState } from "react";
import { useTransition, animated, config } from "react-spring";
import { useHistory } from "react-router-dom";

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
};

function InputFields(props) {
  const { label, placeholderText, description, mobile } = props;
  const [value, setValue] = useState(userFilledData[label]);

  const handleChange = (newVal) => {
    setValue(newVal);
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
  if (page === 3) {
    // log field data
    console.log("DATA check : ", userFilledData);
  }

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
          <div className="completed-text-1">
            Thank you for registering. We will send you an email when your
            <br></br>
            account is ready for your use :)
          </div>
          <div className="completed-text-2">
            Meanwhile, share your referral code with your friends. <br></br>
            We will move you up the waitlist.
          </div>
          <div className="referral-input">Referral Here</div>
        </>
      );
      break;
  }
}

function WaitListForm(props) {
  const { mobile } = props;
  const history = useHistory();
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
