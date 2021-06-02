import React, { useEffect } from "react";
import firebase from "firebase/firebase";
import firebaseConfig from "../firebaseConfig";

function ReferralPage(props) {
  const referralId = props.match.params.id;
  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

    sessionStorage.setItem("referralId", referralId);
    window.location.href = "/";
  }, []);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {" "}
      Processing Referral...
    </div>
  );
}

ReferralPage.propTypes = {};

export default ReferralPage;
