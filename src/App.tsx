import "./index.css";
import YADMApp from "./YADMApp";

const originalWarn = console.warn;

console.warn = (...args) => {
  const [firstArg] = args;
  if (
    typeof firstArg === "string" &&
    firstArg.includes(
      "An aria-label or aria-labelledby prop is required for accessibility."
    )
  ) {
    return;
  }

  originalWarn(...args);
};

export default function App() {
  return <YADMApp />;
}
