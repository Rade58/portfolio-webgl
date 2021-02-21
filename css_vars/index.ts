const storyHH = 48;
const storyHM = 20;
const previewH = 24;
const previewM = 0;
export const upDownAH = 60;

export const upDownArrowHeight = `${upDownAH}px`;
export const storyHeaderHeight = `${storyHH}px`;
export const storyHeaderMargin = `${storyHM}px`;

export const previewHeight = `${previewH}px`;
export const previewMargin = `${previewM}px`;

export const storyHeightMax = "78vh";
export const storyHeightMin = `${
  upDownAH + storyHH + 2 * storyHM + previewH + previewM * 2
}px`;

// MATCH MEDIA

export const matchMediaMaxWidth = "892px";

export const aboveMediaArticleMargin = "12px";

//

// NEKI DOBRI BACKGROUND IMAGE-OVI

export const backgroundImage1 = /* css */ `
  linear-gradient(
    to right,
    rgb(38, 45, 59),
    rgb(63, 44, 56)
  )
`;

export const backgroundImage1Reverse = /* css */ `
  linear-gradient(
    to right,
    rgb(63, 44, 56),
    rgb(38, 45, 59)
  )
`;

// NEKE ZANIMLJIVE BOJE ZA BACKGROUND
export const backgroundColor1 = "#1b2227";
export const backgroundColor2 = "#2a3438";

// NEKI DOBRI LINEAR GRADIENTI KOJI SU VERTICAL GRADIENTI

export const verticalGradient1 = /* css */ `
  linear-gradient( 0.2deg,  rgba(252,220,115,1) -13.1%, rgba(252,194,115,1) 31.9%, rgba(241,84,84,1) 69.6% )
`;
export const verticalGradient2 = /* css */ `
  linear-gradient( 97.3deg,  rgba(25,50,70,0.81) 10.7%, rgba(155,65,25,0.72) 39.5%, rgba(255,192,0,0.81) 69.7% )
`;

export const verticalGradient3 = /* css */ `
  linear-gradient( 111.1deg,  rgba(0,40,70,1) -4.8%, rgba(255,115,115,1) 82.7%, rgba(255,175,123,1) 97.2% )
`;
