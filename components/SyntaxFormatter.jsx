import React from "react";

import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const SyntaxFormatter = ({ codeString }) => {
  return (
    <SyntaxHighlighter language="python" style={a11yDark} wrapLongLines={true}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default SyntaxFormatter;
