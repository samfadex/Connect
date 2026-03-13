//Import message
// import Alert from "./components/Alert";
// import ListGroup from "./components/ListGroup";
import Signup from "./components/Signup";



// function App() {
//     const members = ["Sam", "Stella", "Dianna", "David"];
//     let lang = ["Java", "Python", "Php", "C", "C++"];
//     let notifyParent = (name: string) => {
//         console.log(name + " is selected");
//     }

//     return <div>
//         <Alert color="success">
//             <span>Wecome To King's Connect</span>
//         </Alert>
//         <ListGroup names={members} title="Group Members" onSelected={notifyParent} />
//         <ListGroup names={lang} title="Best programming Languages" onSelected={notifyParent} /> </div>;
// }

//export App


function App() {
  return (
    <div>
      <Signup />
     
    </div>
  );
}

export default App;

