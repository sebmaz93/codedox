import ReactDOM from "react-dom";
import CodeBlock from "./components/code-block";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "./redux";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeBlock />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
