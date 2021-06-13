import './App.css';
import React, { useState, useEffect } from 'react';
import data from './db.json';
import { hot as hotAtom, result } from "./atoms";
import { useRecoilState} from 'recoil';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { result as resultAtom } from "./atoms";
import { regular as regularAtom } from "./atoms";

function Regular() {

    const [hot, setHot] = useRecoilState(hotAtom);
    const [regular, setRegular] = useRecoilState(regularAtom);
    const [result, setResult] = useRecoilState(resultAtom);

    const addClick1 = (j,i) =>{
    
        const newMode = Object.assign({}, j, {upvotes: j.upvotes+1} );
        const newNode = regular.map(el => (el === j ? Object.assign({},  el, newMode ) : el));
        setRegular(newNode);
        //setResult(newNode);
        regular.map((item) =>{
            if(item.upvotes - item.downvotes > 5){
                const newHot = hot.concat(item);
                setHot(newHot);
                setRegular(regular.filter(item=> item.upvotes - item.downvotes <= 5));
            }
            
        })
        }
        const addClick2 = (j,i) =>{
         
        const newMode = Object.assign({}, j, {downvotes: j.downvotes+1} );
        const newNode = regular.map(el => (el === j ? Object.assign({},  el, newMode ) : el));
        setRegular(newNode);
       // setResult(newNode);
       regular.map((item) =>{
        if(item.upvotes - item.downvotes > 5){
            const newHot = hot.concat(item);
            setHot(newHot);
            setRegular(regular.filter(item=> item.upvotes - item.downvotes <= 5));
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
           <h1 className = 'text-center'>Regular</h1>
           {regular.map((item, i) =>(
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
  
  export default Regular;