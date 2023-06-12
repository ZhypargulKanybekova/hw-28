import { Provider } from "react-redux";
import { store } from "./store";
import { MainRoutes } from "./routes/MainRoutes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
