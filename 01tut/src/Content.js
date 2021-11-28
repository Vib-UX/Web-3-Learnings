import { useState } from "react"; // This is use state hook which can be used in our react state component

const Content = () => {

  const [name,setName] = useState('Vib'); // Here we have the default state for name and we can change the state of name using 'setName'
  const [count,setCount] = useState(0);

  const handleNameChange = () => {
    const arr = ["Vib", "Phoebe", "Jordan"];
    const indx = Math.floor(Math.random() * 3);
    setName(arr[indx]);
  };

  //Lets handle events
  const handleClick = ()=>{
      console.log('you clicked it')
  }
  const handleCount = ()=>{
      setCount(count +1);
      console.log(count);
  }

  // Event with a parameter
  const handleClick2 = (name)=>{
      console.log(`${name} was clicked`)
  }
  const handleClick3 = (e)=>{
      console.log(e)
  }
  return (
    <main>
      {/* <p>Hello {handleNameChange()}!</p>  This is a old school vanilla js way */}
      <p> Hello {name} </p>
      <button onClick={handleClick}>Click it!</button>
      <button onClick={handleCount}>Count Click!</button>
      <button onClick={handleNameChange}>Click to Change Name!</button>
      <button onClick={()=> handleClick2('Vib')}>New Click</button>
      <button onClick={(e)=> handleClick3(e)}>Event Click</button>

    </main>
  );
};

export default Content;
