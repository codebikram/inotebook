import { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import './App.css'

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    console.log(alert);
  };
  setTimeout(() => {
    setAlert(null)
  }, 1800);

  return (
    <>
      <NoteState>
        <Router>
          <NavBar title="iNoteBook" showAlert={showAlert} />
          <Alert alert={alert} />
          <div className="container mt-5">
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <LogIn showAlert={showAlert} />
              </Route>
              <Route exact path="/signup">
                <SignUp showAlert={showAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
