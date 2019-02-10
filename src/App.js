import React, { Component } from 'react';
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Test from "./components/Test";

class App extends Component {
  render() {
    const test = false;
    if (!test) {
      return (
        <div className="App">
          <Header />
          <Main />
          <Footer />
        </div>
      );
    } else {
      return <Test />
    }
  }
}

export default App;
