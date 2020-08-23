import React from 'react';
import './index.css';

const states = {
  Init: 0,
  LeftInput: 1,
  OpInput: 2,
  RightInput: 3,
  Equal: 4
}

var numbers = "0123456789";
var operators = "+-*/";
var left, op, right,display;

var state = states.Init;

export default (props) => {

  const { numberValue,changeDisplay} = props
  
  function clickHandler(e){
    let buttonText = e.currentTarget.value;
    if (buttonText === '=') {
      if(state === states.OpInput) {
          right = left;
          evalHandler();
      } else if(state === states.RightInput) {
          right = display;
          evalHandler();
      } else if(state === states.Equal) {
          evalHandler();
      } else if(state === states.Init || state === states.LeftInput) {
          left = display;
          op = right = '';
      }
      state = states.Equal;
  } else if (numbers.includes(buttonText)) {      //输入为数字的情况下
      if(state === states.Init || state === states.Equal) {   //状态为初始状态或者等号状态的情况下
          display = buttonText;        //显示内容变为输入值
          state = states.LeftInput;     //状态改变为左操作录入状态
      } else if(state === states.LeftInput || state === states.RightInput) {   //在左或右操作的状态下继续点击数字
          if(display === '0')   //如果显示内容是0
          {
            display = buttonText;  //输入内容替换
          } 
          else display += buttonText;  //不是零，则输入内容补充
      } else if(state === states.OpInput) {      // 在运算符状态下输入数字
          display = buttonText;        
          state = states.RightInput;   //录入为右操作
      }
  } else if (operators.includes(buttonText)) {   //点击运算符
      if(state === states.Init || state === states.Equal || state === states.LeftInput) {   //初始，左操作录入，等于状态
          left = display; 
          op = buttonText;
      } else if(state === states.OpInput) {  //运算符替换
          op = buttonText;
      } else if(state === states.RightInput) {  //右操作，出结果
          right = display;
          evalHandler();
          op = buttonText; 
      }
      state = states.OpInput;    //变成运算符录入状态

  } else if (buttonText === 'C') {
      display = "0";
      left = op = right = null;
      state = states.Init;
  }
  console.log(display)
  changeDisplay(display);  //子组件传值给父组件
}
function evalHandler() {
  // eslint-disable-next-line 
   display = eval(left + op + right).toString();
   console.log("evalHandler"+left+op+right+'='+display)
   left = display;
   changeDisplay(display);
}
  return (
    <div id="root_container">
    <div id="counter_container"  >
    <p id="title">简易计算器</p>
    {/* <input type="text" id="before"  />
    <br />
    <input type="text" id="after" placeholder="0" /> */}
    <br />
    <div id="counter_number">
      
    <h1 className="result">{numberValue}</h1>
    <button className="but" onClick={clickHandler} value="1"> 1</button>
        <button className="but" onClick={clickHandler} value="2"> 2</button>
        <button className="but" onClick={clickHandler} value="3"> 3</button>
        <button className="but" onClick={clickHandler} value="+"> +</button>
        <br />
        <button className="but" onClick={clickHandler} value="4"> 4</button>
        <button className="but" onClick={clickHandler} value="5"> 5</button>
        <button className="but" onClick={clickHandler} value="6"> 6</button>
        <button className="but" onClick={clickHandler} value="*"> *</button>
        <br />
        <button className="but" onClick={clickHandler} value="7"> 7</button>
        <button className="but" onClick={clickHandler} value="8"> 8</button>
        <button className="but" onClick={clickHandler} value="9"> 9</button>
        <button className="but" onClick={clickHandler} value="/"> /</button>
        <br />
        <button className="but" onClick={clickHandler} value="0"> 0</button>
        <button className="but" onClick={clickHandler} value="-"> -</button>
        <button className="clean" onClick={clickHandler} value="C"> C</button>
        <button className="but" onClick={clickHandler} value="="> =</button>
    </div>
    </div>
    </div>
  );

}