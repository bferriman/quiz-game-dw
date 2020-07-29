import React from "react";
import ContentWrapper from "./components/ContentWrapper";

function App() {
  return (
    <Router>
      <ContentWrapper>
        <Header />
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <PrivateRoute exact path="/account" component={Account} />
          <AdminRoute exact path="/admin" component={Admin} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/store" component={Store} />
        </Switch>
      </ContentWrapper>
      <Footer />
    </Router>
  );
}

export default App;
