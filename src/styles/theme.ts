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
};

const shadows = {
  $BOOK_SHADOWS: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
};

export const theme = {
  colors,
  flexbox,
  shadows,
};
