const flexbox = (direction = "row", justify = "center", align = "center") => {
  return `
  display: flex;
  justify-content: ${justify};
  align-items: ${align};
  flex-direction: ${direction};
  `;
};

const colors = {
  white: "#FFFFFF",
  $BACKGROUND: "#fdfaf6",
  $TAB: "",
  $BORDER: "#dddddd",
  $INPUT: "#fdfaf6",
  $BASIC: "#393B44",
  $SLIDER: "#6ebfb8",
  $LIST: "#f6fbf4",
  $LIST_HOVER: "#a7d7c5",
  $AGREEBTN: "#deecfc",
};

const shadows = {
  $BOOK_SHADOWS: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
  $LIST_SHADOWS: "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;",
};

export const theme = {
  colors,
  flexbox,
  shadows,
};
