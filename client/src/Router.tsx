import { BrowserRouter, Route } from "react-router-dom";
import App from "./pages/App";
import Vote from "./pages/Vote";
import Store from "./context";

export default function Router() {
  return (
    <BrowserRouter>
      <Store>
        <>
          <Route exact path="/" component={App} />
          <Route exact path="/:id" component={Vote} />
        </>
      </Store>
    </BrowserRouter>
  );
}
