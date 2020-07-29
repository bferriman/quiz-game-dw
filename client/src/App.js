import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContentWrapper from "./components/ContentWrapper";
import Title from "./pages/Title";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";

function App() {
  return (
    <Router>
      <ContentWrapper>
        <Switch>
          <Route exact path={["/", "/home"]} component={Title} />
          <Route exact path="/quiz" component={Quiz} />
          <Route exact path="/score" component={Score} />
        </Switch>
      </ContentWrapper>
    </Router>
  );
}

export default App;
