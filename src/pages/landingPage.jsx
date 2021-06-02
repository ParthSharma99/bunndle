import React, { lazy, Suspense } from "react";
import loadable from "@loadable/component";
// import WaitlistPage from "../components/waitlistPage";
import page1img from "../images/page1img.png";
import page2img from "../images/page2img.png";
import page3img from "../images/page3img.png";
import page4img from "../images/page4img.png";
import page1imgMobile from "../images/page1imgMobile.png";
import page2imgMobile from "../images/page2imgMobile.png";
import page3imgMobile from "../images/page3imgMobile.png";
import page4imgMobile from "../images/page4imgMobile.png";

const WaitlistPage = loadable(() => import("../components/waitlistPage"));

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
      { rootMargin: "-41% 0px", threshold: 0.2 }
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
  const { mobile } = props;
  if (mobile) {
  } else {
  }
  const data = mobile ? mobilepagesData : pagesData;

  return data.map((page, key) => {
    return (
      <FadeInSection mobile={mobile}>
        <div
          className="waitlist-page-wrapper"
          id={key === 0 ? "topPage" : ""}
          key={key}
        >
          <Suspense fallback={<h1>Loading...</h1>}>
            <WaitlistPage {...page} mobile={mobile} />
          </Suspense>
        </div>
      </FadeInSection>
    );
  });
}

LandingPage.propTypes = {};
export default LandingPage;
