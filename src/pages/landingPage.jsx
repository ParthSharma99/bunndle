import React, { useState, useEffect } from "react";
import WaitlistPage from "../components/waitlistPage";
import page1img from "../images/page1img.png";
import page2img from "../images/page2img.png";
import page3img from "../images/page3img.png";
import page4img from "../images/page4img.png";
import page1imgMobile from "../images/page1imgMobile.png";
import page2imgMobile from "../images/page2imgMobile.png";
import page3imgMobile from "../images/page3imgMobile.png";
import page4imgMobile from "../images/page4imgMobile.png";

const pagesData = [
  {
    id: 0,
    titleText: `Build a better network of\nprofessionals and friends\nwhile protecting your privacy`,
    descriptionText: "",
    imgSrc: page1img,
    showMeHow: true,
  },
  {
    id: 1,
    titleText: `Tailor-made for\ncreators and innovators`,
    descriptionText: `content creators and innovators need to\nnetwork to reach more audience effectively`,
    imgSrc: page2img,
    showMeHow: false,
  },
  {
    id: 2,
    titleText: `Convey your identity better`,
    descriptionText: `choose from over 30 personas. (we’re adding more)`,
    imgSrc: page3img,
    showMeHow: false,
  },
  {
    id: 3,
    titleText: `Multiple levels of privacy`,
    descriptionText: `you have absolute control over who can see what`,
    imgSrc: page4img,
    showMeHow: false,
  },
];

const mobilepagesData = [
  {
    id: 0,
    titleText: `Build a better network of\nprofessionals and friends\nwhile protecting your privacy`,
    descriptionText: "",
    imgSrc: page1imgMobile,
    showMeHow: true,
  },
  {
    id: 1,
    titleText: `Tailor-made for\ncreators and innovators`,
    descriptionText: `content creators and innovators need to\nnetwork to reach more audience effectively`,
    imgSrc: page2imgMobile,
    showMeHow: false,
  },
  {
    id: 2,
    titleText: `Convey your identity better`,
    descriptionText: `choose from over 30 personas. (we’re adding more)`,
    imgSrc: page3imgMobile,
    showMeHow: false,
  },
  {
    id: 3,
    titleText: `Multiple levels of privacy`,
    descriptionText: `you have absolute control over who can see what`,
    imgSrc: page4imgMobile,
    showMeHow: false,
  },
];

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      },
      { rootMargin: "-40% 0px", threshold: 0.2 }
    );
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

function LandingPage(props) {
  const referralId = sessionStorage.getItem("referralId");
  const { mobile } = props;
  const [index, setIndex] = useState(1);
  const data = mobile ? mobilepagesData : pagesData;
  const page = data[index - 1];
  const [scrollPosition, setScrollPosition] = useState(0);
  const [elementHeight, setElementHeight] = useState(0);
  const positions = [0.5, 1.5, 2.5, 3.5];

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    console.log(position);
    // setElementHeight(
    //   document.getElementsByClassName("waitlist-page-wrapper")[0].clientHeight
    // );
    // let windowBottom = position + window.innerHeight;
    // let items = document.getElementsByClassName("waitlist-page-wrapper");
    // for (let i = 0; i < items.length; i++) {
    //   let objectBottom =
    //     items[i].getClientRects()[0].top + items[i].getClientRects()[0].height;
    //   console.log("hey   ", items[i].getClientRects()[0].top);

    //   if (objectBottom < windowBottom) {
    //     if (items[i].style.opacity === 0) items[i].style.opacity = 1;
    //   } else {
    //     if (items[i].style.opacity === 1) items[i].style.opacity = 0;
    //   }
    // }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return data.map((page, key) => {
    return (
      <FadeInSection>
        <div
          className={
            mobile ? "waitlist-page-wrapper-mobile" : "waitlist-page-wrapper"
          }
        >
          <WaitlistPage {...page} mobile={mobile} />
        </div>
      </FadeInSection>
    );
  });

  // const nextPage = () => {
  //   setTimeout(() => {
  //     if (index === 4) {
  //       setIndex(1);
  //     } else {
  //       setIndex(index + 1);
  //     }
  //   });
  // };

  // const transitions = useTransition(index, {
  //   from: { opacity: 0 },
  //   enter: { opacity: 1 },
  //   config: config.default,
  // });

  // return transitions(
  //   (styles, item) =>
  //     item && (
  //       <animated.div style={styles}>
  //         <div className="waitlist-page-wrapper" onClick={() => nextPage()}>
  //           <WaitlistPage {...page} mobile={mobile} />
  //         </div>
  //       </animated.div>
  //     )
  // );
}

LandingPage.propTypes = {};
export default LandingPage;
