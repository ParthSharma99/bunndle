import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

function WaitlistPageMobile(props) {
  const { titleText, descriptionText, imgSrc, showMeHow } = props;

  return (
    <>
      <div className="title-text-mobile">{titleText}</div>
      <div className="description-text-mobile">{descriptionText}</div>
      {/* <div className="button-wrapper-mobile">
        <button className="join-waitlist-button">Join Waitlist</button>
      </div> */}

      <div className="image-wrapper-mobile">
        <img src={imgSrc} />
      </div>
      {showMeHow ? (
        <a className="showMeHow-text-mobile" href="#">
          show me how?
        </a>
      ) : (
        ""
      )}
    </>
  );
}

function WaitlistPage(props) {
  const { titleText, descriptionText, imgSrc, showMeHow, mobile, nextPage } =
    props;
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (location.action === "POP") {
        history.goBack();
      }
    });
  }, []);
  if (mobile) return WaitlistPageMobile(props);
  return (
    <>
      <div className="left-side-text-wrapper">
        <div className="title-text">{titleText}</div>
        <div className="description-text">{descriptionText}</div>
        <div className="button-wrapper">
          <button
            className="join-waitlist-button"
            onClick={() => (window.location.href = "waitlist")}
          >
            Join Waitlist
          </button>
          {showMeHow ? (
            <a className="showMeHow-text" href="#">
              show me how?
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="image-wrapper">
        <img src={imgSrc} />
      </div>
    </>
  );
}

WaitlistPage.propTypes = {};

export default WaitlistPage;
