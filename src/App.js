import './App.css'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './components/Chat/Chat'
import Sidebar from './components/Sidebar/Sidebar'
import Login from './components/Login/Login'
import Header from './components/Header/Header'

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Switch>
            <Route path='/room'>
              <Header />
              <Main>
                <Sidebar />
                <Chat />
              </Main>
            </Route>
            <Route path='/'>
              <Login />
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
`
const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
  background: var(--chatarea-color);
`