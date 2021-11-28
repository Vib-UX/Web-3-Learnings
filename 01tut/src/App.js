import logo from "./logo.svg";
import "./App.css";

// Functional Components Imports
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
function App() {

  const name = "Vib";
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Header />
      <Content />
      <p> {name} </p>
      {/* 
          So curly braces are generally used to render it in javascript.
          Though we cannot render objects and boolean value inside the curly braces
        */}
        <Footer/>
    </div>
  );
}

export default App;
