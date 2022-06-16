import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BrowserRouter, Route,Link,Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';

// LA API ES ALTAMENTE INESTABLE ( SE CAE MUY SEGUIDO)

function App() {

  const [MainData, setMainData] = useState({});
  const [Values, setValues] = useState('');
  const [TextInput, setTextInput] = useState('');
  const [SubmitedInfo, setSubmitedInfo] = useState('');
  const [LastInfo, setLastInfo] = useState('z');
  const [Divs, setDivs] = useState('');
  const [Errors, setErrors] = useState('');
  
  

  const selectOne = (e) =>{
    setValues(e.target.value)
  }
  const handleText = (e) =>{
    setTextInput(e.target.value)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    setSubmitedInfo(TextInput)
    filter()
  }

  useEffect(()=>axios.get(`https://swapi.dev/api/${Values}`).then(result=>setMainData(result.data.results)),[Values,SubmitedInfo])

  const filter = () =>{
    if(SubmitedInfo !== LastInfo){
      setLastInfo(SubmitedInfo)
      MainData.map((result,id)=>{
        if(parseInt(SubmitedInfo) === (id+1)){
          const arr = Object.keys(result).map(function (key) {return [(key), result[key]];})
          setDivs(
          <>
            <div>
              {arr[0][0]} : {arr[0][1]}
            </div>
            <div>
              {arr[1][0]} : {arr[1][1]}
            </div>
            <div>
              {arr[2][0]} : {arr[2][1]}
            </div>
            <div>
              {arr[3][0]} : {arr[3][1]}
            </div>
          </>
          )
          setErrors('')
          console.log(Divs)
        }else if (SubmitedInfo & SubmitedInfo !== (id+1)){
          setDivs(
            ''
          )
          setErrors(
            <div>
              Estos no son los androides que estas buscando
            </div>
          )
        }
      })
    }
  }
  return (
    <>
      <div>
        <span>Search for:</span><select onChange={selectOne}>
          <option value="films" key="1">Films</option>
          <option value="people" key="2">People</option>
          <option value="planets" key="3">Planets</option>
          <option value="species" key="4">Species</option>
          <option value="starships" key="5">Starships</option>
          <option value="vehicles" key="6">Vehicles</option>
        </select>
        <form onSubmit={handleSubmit}>
          <span>Ingrese un ID:</span>
          <input type="number" onChange={handleText}/>
          <input type="submit" />
        </form>
      </div>
      <div>
        {Divs}
        {Errors}
      </div>
    </>
  );
}
export default App;
