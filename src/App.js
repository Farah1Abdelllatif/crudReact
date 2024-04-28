
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import Student from './student.js';
import CreateStudent from './CreateStudent.js';
import UpdateStudent from './UpdateStudent.js';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Student/>}></Route>
        <Route path='/create' element={<CreateStudent/>}></Route>
        <Route path='/update/:id' element={<UpdateStudent/>}></Route>
        <Route path='/delete' element={<CreateStudent/>}></Route>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
