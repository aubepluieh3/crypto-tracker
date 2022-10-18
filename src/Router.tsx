import { Routes, Route, HashRouter } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {}

function Router({}: IRouterProps) {
  return (
    <HashRouter>
      <Routes>
        <Route path=":coinId/*" element={<Coin />}></Route>
        <Route path="/" element={<Coins />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default Router;
