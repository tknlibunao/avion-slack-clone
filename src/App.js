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
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const inputUser = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };
  const inputConfirmation = (e) => {
    setConfirmation(e.target.value);
  };
  const inputMessage = (e) => {
    setMessage(e.target.value);
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("access-token", localStorage.getItem("token"));
  myHeaders.append("client", localStorage.getItem("client"));
  myHeaders.append("expiry", localStorage.getItem("expiry"));
  myHeaders.append("uid", localStorage.getItem("uid"));

  const url = "http://206.189.91.54//api/v1";

  const registerUser = (e) => {
    e.preventDefault();
    fetch("http://206.189.91.54//api/v1/auth", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    })
      .then((result) => {
        if (email === "") {
          setError("Field empty: email");
        } else if (password === "") {
          setError("Field empty: password");
        } else if (confirmation === "") {
          setError("Field empty: password confirmation");
        } else if (password !== confirmation) {
          setError("Password does not match");
        } else if (result.status === 422) {
          setError("Email already taken");
        } else {
          alert("Registration Successful!");
          setError("");
          e.target.reset();
          setEmail("");
          setPassword("");
          setConfirmation("");
        }

        // history.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginUser = (e) => {
    e.preventDefault();
    let raw = JSON.stringify({
      email: email,
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
          setSuccess(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message === "") {
      return;
    } else {
      fetch(`${url}/messages`, {
        method: "POST",
        body: JSON.stringify({
          receiver_id: 1,
          receiver_class: "User",
          body: message,
        }),
        headers: myHeaders,
        redirect: "follow",
      })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setMessage("");
          }
        })
        .catch((err) => console.log(err));
    }
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
                <Chat
                  onClick={sendMessage}
                  message={message}
                  onChange={inputMessage}
                />
              </Main>
            </Route>
            <Route path="/signup">
              {localStorage.getItem("token") !== null ? (
                <Redirect to="/room/:path/:id" />
              ) : (
                <Register
                  onSubmit={registerUser}
                  inputUser={inputUser}
                  inputPassword={inputPassword}
                  inputConfirmation={inputConfirmation}
                  error={error}
                />
              )}
            </Route>
            <Route path="/login">
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

            <Route path="/">
              {localStorage.getItem("token") !== null ? (
                <Redirect to="/room/:path/:id" />
              ) : (
                <Home />
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
