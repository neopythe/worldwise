import { Link } from "react-router-dom";

import Navigation from "@/components/Navigation";

function Homepage() {
  return (
    <div>
      <Navigation />
      <h1>WorldWise</h1>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}

export default Homepage;
