import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

// Functional Components Imports
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import ContentUpdate from "./ContentUpdate";


function App() {
  // The idea behind bringing the content outside the contentUpdate.js so that we are able to access the elements in 
  // out footer component
  const [items, setItems] = useState([
    {
        id: 1,
        checked: false,
        item: "One half pound"
    },
    {
        id: 2,
        checked: false,
        item: "item 2"
    },
    {
        id: 3,
        checked: false,
        item: "item 3"
    }
  ]);

    const handleCheck = (id)=>{
    // const listItems = [...items] // Creating shallow copy of the items
        const listItems = items.map((item) => item.id === id ? {
        ...item, checked: !item.checked} : item);
        setItems(listItems);
        localStorage.setItem('shoppinglist', JSON.stringify(listItems));
    }

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id!==id)  // This filter is used to create a new array omitting the id
        setItems(listItems)
        localStorage.setItem('shoppinglist', JSON.stringify(listItems))
    }

  const name = "Vib";
  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Header title="Groceries List"/> {/* here title has been passed as props from parent --> child */}
     <ContentUpdate
        items={items}
        handleCheck ={handleCheck}
        handleDelete = {handleDelete}
     />
      <p> {name} </p>
      {/* 
          So curly braces are generally used to render it in javascript.
          Though we cannot render objects and boolean value inside the curly braces
        */}
        <Footer
          length ={items.length}
        />
    </div>
  );
}

export default App;
