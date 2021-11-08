import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </>
      </BrowserRouter>
  );
}

export default App;
