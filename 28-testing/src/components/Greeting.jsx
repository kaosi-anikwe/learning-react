import { useState } from "react";

import Output from "./Output";

export default function Greeting() {
  const [changedText, setChangedText] = useState(false);

  function handleTextChange() {
    setChangedText((prev) => !prev);
  }

  return (
    <>
      <h1>Hello World!</h1>
      {!changedText && <Output>It's nice to see you!</Output>}
      {changedText && <Output>Changed!</Output>}
      <button onClick={handleTextChange}>Change Text</button>
    </>
  );
}
