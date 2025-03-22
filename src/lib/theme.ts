import { createTheme, MantineColorsTuple } from "@mantine/core";

const myColor: MantineColorsTuple = [
  "#fff2e2",
  "#ffe3cc",
  "#ffc59a",
  "#ffa564",
  "#fe8a37",
  "#fe791a",
  "#ff7009",
  "#e45f00",
  "#cb5300",
  "#b14500",
];

export const theme = createTheme({
  fontFamily: "var(--font-poppins), sans-serif",
  headings: {
    fontFamily: "var(--font-poppins), sans-serif",
  },
  primaryColor: "myColor",
  colors: {
    myColor: myColor,
  },
});
