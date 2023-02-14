import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./routes";
import "./styles/app.css"

export default function App() {
  return (<>
    <Router>
      <Routing />
    </Router>
  </>
  );
}