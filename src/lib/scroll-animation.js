import { gsap } from "gsap";

//every time we added the params of our camera we call this fn to update and render

export const scrollAnimation = (position, target, isMobile, onUpdate) => {
  const tl = gsap.timeline();
  tl.to(position, {
    x: !isMobile ? -3.38 : -7.0,
    y: !isMobile ? -10.74 : -12.2,
    z: !isMobile ? -5.93 : -6.0, // the cam position of the model that we grab from webgi viewer
    scrollTrigger: {
      trigger: ".sound-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
    onUpdate,
  });
  // lly lets do it for the target as well
  tl.to(target, {
    x: !isMobile ? 1.52 : 0.7,
    y: !isMobile ? 0.77 : 1.9,
    z: !isMobile ? -1.08 : 0.7, // the cam position of the model that we grab from webgi viewer
    scrollTrigger: {
      opacity: 0,
      trigger: ".jumbotron-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
  });

  tl.to(".jumbotron-section", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".sound-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
  });
  // lets add the fade in animation
  tl.to(".sound-section-content", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".sound-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
  });

  // now lets update the scroll animatioon for the sound section to the display
  tl.to(position, {
    x: !isMobile ? 1.56 : 9.36,
    y: !isMobile ? 5.0 : 10.95,
    z: !isMobile ? 0.01 : 0.09, // the cam position of the model that we grab from webgi viewer
    scrollTrigger: {
      trigger: ".display-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
    onUpdate,
  });
  // lly lets do it for the target as well
  tl.to(target, {
    x: !isMobile ? -0.55 : -1.62,
    y: !isMobile ? 0.32 : 0.02,
    z: !isMobile ? 0.0 : -0.06, // the cam position of the model that we grab from webgi viewer
    scrollTrigger: {
      opacity: 0,
      trigger: ".display-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
  });
  //lets also fade in the display sec as well
  tl.to(".display-section", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".display-section", // the obj  triggers in the sound sec (dom elem)
      start: "top bottom", // when the top of the sound sec hits the bottom of the vp
      end: "top top", //end when the top of the sound section and top of vp.
      scrub: 2, //for the transition
      immediateRender: false, //we re not gon render until this animation is triggered.
    },
  });
};
