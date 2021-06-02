import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function WaitlistPage(props) {
  const { titleText, descriptionText, imgSrc, showMeHow } = props;
  const history = useHistory();

  useEffect(() => {
    return history.listen((location) => {
      if (location.action === "POP") {
        history.goBack();
      }
    });
  }, []);
  return (
    <>
      <div className="left-side-text-wrapper">
        <div className="title-text">{titleText}</div>
        <div className="description-text">{descriptionText}</div>
      </div>
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
      <div className="image-wrapper">
        <img alt="" src={imgSrc} />
      </div>
    </>
  );
}

WaitlistPage.propTypes = {};

export default WaitlistPage;
