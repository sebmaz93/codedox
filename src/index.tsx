import ReactDOM from "react-dom";
import CodeBlock from "./components/code-block";
import "bulmaswatch/superhero/bulmaswatch.min.css";

const App = () => {
  return (
    <div>
      <CodeBlock />
      <CodeBlock />
      <CodeBlock />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
