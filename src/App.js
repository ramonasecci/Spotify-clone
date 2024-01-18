import logo from './logo.svg';
import './App.css';
import GetSong from './components/GetSong';
import { useState } from 'react';
import ShowSongs from './components/ShowSongs';
import { Container, Row, Col, Form, Button } from 'react-bootstrap'



function App() {
  const [genere1, setGenere1] = useState([])
  const [genere2, setGenere2] = useState([])
  const [genere3, setGenere3] = useState([])

  const getDifGenere1 = (gen) => {
    setGenere1(gen)
  }
  const getDifGenere2 = (gen) => {
    setGenere2(gen)
  }
  const getDifGenere3 = (gen) => {
    setGenere3(gen)
  }

  return (
    <div className="App">
      <Row>
        <Col xs={3}>
          <GetSong getDifGenere={getDifGenere1} genere="rock" />
        </Col>    
        <Col xs={3}>
          <GetSong getDifGenere={getDifGenere2} genere="punk" />
        </Col>
        <Col xs={3}>
          <GetSong getDifGenere={getDifGenere3} genere="classic" />
        </Col>
      </Row>
    </div>
  );
}

export default App;
