import React from 'react';
import ReactDOM from 'react-dom';

/***** 
    Embedding Expressions in JSX
*****/
// ***** 1 *****
// const name = 'Josh Perez';
// const element = <h1>Hello, {name}</h1>;

// ***** 2 *****
// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// const user = {
//     firstName: 'Harper',
//     lastName: 'Perez'
// }

// const element = (
//     <h1>
//         Hello, {formatName(user)}!
//     </h1>
// );

/***** 
    JSX is an Expression Too
*****/
// function getGreeting(name) {
//     if(user) {
//         return <h1>Hello, {formatName(user)}!</h1>;
//     }
//     return <h1>Hello, Stranger.</h1>;
// }

// function formatName(user) {
//     return user.firstName + ' ' + user.lastName;
// }

// const user = {
//     firstName: 'Harper',
//     lastName: 'Perez'
// }

// const element = (
//     <h1>
//         {getGreeting(user)}
//     </h1>
// );

/***** 
    Specifying Attributes with JSX
*****/
// ***** 1 *****
// const element = <div tabIndex="0"></div>
// ***** 2 *****
// const element = <img src={user.avatarUrl}></img>


/*****  
    Specifying Children with JSX
******/
/* 
    If a tag is empty, you may close it immediately with /> 
*/
// ***** 1 *****
// const element = <img src={user.avatarUrl} />;

// ***** 2 *****
// const element = (
//     <div>
//         <h1>Hello!</h1>
//         <h2>Good to see you here.</h2>
//     </div>
// );

/***** 
    JSX Prevents Injection Attacks
*****/
/*
    React DOM escapes any values embedded in JSX before rendering them.Thus it ensures that you can never inject anything that’ s not explicitly written in your application.Everything is converted to a string before being rendered.This helps prevent XSS(cross - site - scripting) attacks.

*/
// const title = response.potentialMaliciousInput;
/* This is safe */
// const element = <h1>{title}</h1>;

/***** 
    JSX Represents Objects
*****/
/* 
    These two examples are identical
*/
// const element = ( <
//     h1 className = "greeting" >
//     Hello, world!
//     <
//     /h1>
// );
const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello World!'
);

/* 
    Common 
*/
ReactDOM.render(
    element,
    document.getElementById('root')
);