import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AdminStore from "./utils/adminStore";

const App = () => {
  return (
    <div>
      <Provider store={AdminStore}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </div>
  );
};
export default App;
