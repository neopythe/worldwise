import { Link } from "react-router-dom";

import PageNavigation from "@/components/PageNavigation";

function Homepage() {
  return (
    <div>
      <PageNavigation />
      <h1>WorldWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}

export default Homepage;
