import './App.css';
import React, { useState, useEffect } from 'react';
import data from './db.json';
import { hot as hotAtom, result } from "./atoms";
import { useRecoilState} from 'recoil';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { result as resultAtom } from "./atoms";
import { regular as regularAtom } from "./atoms";
import 'bootstrap/dist/css/bootstrap.css';

function Hot() {

    const [regular, setRegular] = useRecoilState(regularAtom);
    const [hot, setHot] = useRecoilState(hotAtom);
    const [result, setResult] = useRecoilState(resultAtom);

    const addClick1 = (j,i) =>{
    
    const newMode = Object.assign({}, j, {upvotes: j.upvotes+1} );
    const newNode = hot.map(el => (el === j ? Object.assign({},  el, newMode ) : el));
    setHot(newNode);
    hot.map((item) =>{
        if(item.upvotes - item.downvotes <= 5){
            const newReg = regular.concat(item);
            setRegular(newReg);
            setHot(hot.filter(item=> item.upvotes - item.downvotes > 5));
        }
        
    })
}

    const addClick2 = (j,i) =>{
     
    const newMode = Object.assign({}, j, {downvotes: j.downvotes+1} );
    const newNode = hot.map(el => (el === j ? Object.assign({},  el, newMode ) : el));
    setHot(newNode);
    hot.map((item) =>{
        if(item.upvotes - item.downvotes <= 5){
            const newReg = regular.concat(item);
            setRegular(newReg);
            setHot(hot.filter(item=> item.upvotes - item.downvotes > 5));
        }
        
    })
    }


    return (
        <div className = 'container-fluid'>
        <div className="row">
          <div className="col-md-1">
          </div>
          <div className="col-md-10">
            <div className= 'content'>
            {console.log(hot)}
            {console.log(regular)}
           <h1 className = 'text-center'>Hot</h1>
           {hot.map((item, i) =>(
                <ul key = {i}>
                <li>
                   <b> {item.title} </b>
                </li>
                   
                <li>
                    <img src = {item.img} />
                </li>
               
               <li className = 'arr'>
               <div className ='arrows'>
                    <div className = 'arrowup'><button className="fas fa-arrow-circle-up" onClick = {(j) => { addClick1(item, i)}}>{item.upvotes}</button></div>
                    <div className = 'arrowdown'><button className="fas fa-arrow-circle-down" onClick = {(j) => {addClick2(item, i)}}>{item.downvotes}</button></div>
                </div>
               </li>
               
            </ul>
               
           ))
           }
            </div>
        </div>
        <div className="col-md-1">
          </div>
          </div>
          </div>
    );
  }
  
  export default Hot;