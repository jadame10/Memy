import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Hot from './hot';
import Regular from './regular';
import data from './db.json';
import { useRecoilState} from 'recoil';
import { hot as hotAtom } from "./atoms";
import { regular as regularAtom } from "./atoms";
import { result as resultAtom } from "./atoms";
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const [regular, setRegular] = useRecoilState(regularAtom);
  const [hot, setHot] = useRecoilState(hotAtom);
  const [result, setResult] = useRecoilState(resultAtom);

useEffect(() =>{
  const newRes = result.push(data);
  setResult(newRes);
  console.log(result);
  result[0].map((item)=>{
  if(item.upvotes - item.downvotes > 5){ 
   const newH = hot.push(item);
    setHot(newH);
    }else{
    const newR = regular.push(item);
    setRegular(newR);
    }
  });
 
  setHot(hot);
  setRegular(regular);
  
}, []);


  return (
    <div className = 'container-fluid'>
        <div className="row">
          <div className="col-md-2">
          </div>
          <div className="col-md-8">
          <header>
          <Router>
          <div className = 'menu'>
          <Link to = '/hot'><button className = 'btn btn-primary'>HOT</button></Link>
          <Link to = '/regular'><button className = 'btn btn-success as'>REGULAR</button></Link>
          </div>
          <Switch>
          <Route exact path ="/hot" component={Hot} /> 
          <Route exact path ="/regular" component={Regular} /> 
          </Switch>
          </Router>
          </header>
          </div>
          <div className="col-md-2">
          </div>
        </div>
      </div>
      
    
  );
}

export default App;
