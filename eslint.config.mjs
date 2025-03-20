import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

const eslintConfig = [
  {
    ignores: ["node_modules", ".next", "dist"], // Ignore build folders
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "airbnb",
    "airbnb/hooks",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended",
  ),
  {
    rules: {
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "import/no-extraneous-dependencies": "off",
      "react/react-in-jsx-scope": "off",
      "tailwindcss/no-custom-classname": "off", // Avoid conflicts with custom classes
    },
  },
];

export default eslintConfig;
