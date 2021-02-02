import ReactDOM from "react-dom";
import BlockList from "components/block-list";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import { Provider } from "react-redux";
import { store } from "reduxState";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BlockList />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
