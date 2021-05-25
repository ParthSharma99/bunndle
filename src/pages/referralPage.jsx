import React, { useEffect } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/firebase";

import firebaseConfig from "../firebaseConfig";

function ReferralPage(props) {
  const userId = props.match.params.id;
  const { firebase } = props;
  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    let val = 1,
      found = false;
    let ref = firebase.database().ref("users/" + userId);
    ref
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() && snapshot.val().referralCount) {
          console.log("here");
          val = snapshot.val().referralCount;
          found = true;
        }
      })
      .then(() => {
        if (found) {
          console.log("here2");
          firebase
            .database()
            .ref("users")
            .child(userId)
            .child("referralCount")
            .set(val + 1)
            .then(() => {
              window.location.href = "/";
            });
        } else {
          window.location.href = "/";
        }
      });
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
