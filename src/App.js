import "./App.css";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Chat from "./components/Chat/Chat";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";

function App() {
  /* USER PARAMETERS */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [success, setSuccess] = useState(false);

  const inputUser = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("access-token", localStorage.getItem("token"));
  myHeaders.append("client", localStorage.getItem("client"));
  myHeaders.append("expiry", localStorage.getItem("expiry"));
  myHeaders.append("uid", localStorage.getItem("uid"));

  const url = "http://206.189.91.54//api/v1";

  const loginUser = (e) => {
    e.preventDefault();
    let raw = JSON.stringify({
      email: email,
      // email: 'usersample03@gmail.com',
      password: password,
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${url}/auth/sign_in`, requestOptions)
      .then((response) => {
        response.headers.forEach((item, key) => {
          switch (key) {
            case "access-token":
              // setAccessToken(item);
              localStorage.setItem("token", item);
              break;
            case "client":
              // setClient(item);
              localStorage.setItem("client", item);
              break;
            case "expiry":
              // setExpiry(item);
              localStorage.setItem("expiry", item);
              break;
            case "uid":
              // setUID(item);
              localStorage.setItem("uid", item);
              break;
            default:
              break;
          }
        });
        if (response.status === 200) {
          // alert("LOGIN SUCCESS");
          setSuccess(true);
          // localStorage.setItem("success", success);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="App">
      <Router>
        <Container>
          <Switch>
            <Route path="/room">
              <Header />
              <Main>
                <Sidebar />
                <Chat />
              </Main>
            </Route>
            <Route path="/">
              {localStorage.getItem("token") !== null ? (
                <Redirect to="/room/:path/:id" />
              ) : (
                <Login
                  onSubmit={loginUser}
                  inputUser={inputUser}
                  inputPassword={inputPassword}
                />
              )}
            </Route>
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  display: grid;
  grid-template-rows: 38px auto;
  width: 100vw;
  height: 100vh;
`;
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
  background: var(--chatarea-color);
`;
