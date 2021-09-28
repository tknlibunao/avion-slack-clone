import React, { useState } from "react";
import Form from "./components/Form/Form";
import "./App.css";
import Login from "./components/Login/Login";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const submitFormHandler = (event) => {
    event.preventDefault();

    for (let i = 0; i < 3; i++) {
      if (event.target[i].value.length === 0) return;
    }

    event.target.reset();
    setEmail("");
    setPassword("");
    setConfirmation("");
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
    // console.log(event.target[2].value);
    // console.log(typeof event.target);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(name, value);
    switch (name) {
      case "email":
        return setEmail(value);
      case "password":
        return setPassword(value);
      case "confirmation":
        return setConfirmation(value);
      default:
        break;
    }
  };

  const submitData = () => {
    // check if input data is updated
    if (
      email.length === 0 ||
      password.length === 0 ||
      confirmation.length === 0
    )
      return alert("Please fill up all input fields!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Confirmation: ${confirmation}`);

    var body = {
      email: "user2@gmail.com",
      password: "12345678",
      password_confirmation: "12345678",
    };

    // call fetch here
    post("http://206.189.91.54//api/v1/auth", body)
      .then((result) =>
        console.log(
          `Success: ${result.success}\nError: ${result.errors}\nStatus: ${result.status}`
        )
      )
      .catch((error) => console.log(error.errors));

    // fetch('http://206.189.91.54//api/v1/auth', {
    // 	method: 'POST',
    // 	body: {
    // 		email: { email },
    // 		password: { password },
    // 		password_confirmation: { confirmation },
    // 	},
    // 	redirect: 'follow',
    // })
    // 	.then((response) => response.text())
    // 	.then((result) => console.log(result))
    // 	.catch((error) => console.log(error));
  };

  async function post(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      redirect: "follow",
    });
    return response.json();
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>User Registration</h1>
        <Form
          className="Form"
          onSubmit={submitFormHandler}
          onChange={handleChange}
          onClick={submitData}
        />
        <Login />
      </header>
    </div>
  );
}

export default App;
