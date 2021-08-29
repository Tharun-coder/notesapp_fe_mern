import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandinPage from "./screens/LandingPage/LandinPage";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import CreateNote from "./screens/CreateNote/CreateNote";
import UpdateNote from "./screens/UpdateNote/UpdateNote";
import { useState } from "react";
import { ProfileScreen } from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <div className="App">
        <Header setSearch={setSearch} />
        <main>
          <Switch>
            <Route exact path="/" component={LandinPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/mynotes"
              component={() => <MyNotes search={search} />}
            />
            <Route exact path="/createnote" component={CreateNote} />
            <Route exact path="/note/:id" component={UpdateNote} />
            <Route exact path="/profile" component={ProfileScreen} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
