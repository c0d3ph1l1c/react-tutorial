import React from 'react';
import ReactDOM from 'react-dom';

/*****
    Function and Class Components
*****/
/* Function */
// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
// }

// ReactDOM.render(
//     <Welcome name="John Doe" />, 
//     document.getElementById('root')
// );

/* ES6 Class */
// class Welcome extends React.Component {
//     render() {
//         return <h1>Hello, {this.props.name}</h1>;
//     }
// }

// ReactDOM.render( 
//     <Welcome name = "John Doe" /> ,
//     document.getElementById('root')
// );

/*****
    Rendering a Component
*****/
/* User-defined Components */
// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
// }

// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//     element,
//     document.getElementById('root')
// );

/*****
    Composing Components
*****/
// function Welcome(props) {
//     return <h1>Hello, {props.name}</h1>;
// }

// function App() {
//     return (
//         <div>
//             <Welcome name="Sara" />
//             <Welcome name="Cahal" />
//             <Welcome name="Edite" />
//         </div>
//     );
// }

// ReactDOM.render(
    //     <App />,
    //     document.getElementById('root')
    // );
    
    
/*****
    Extracting Components
*****/
// function format(date) {
//     return date.toLocaleDateString();
// }

// function Comment(props) {
//     return (
//         <div className="Comment">
//             <div className="UserInfo">
//                 <img className="Avatar" 
//                     src={props.author.avatarUrl}
//                     alt={props.author.name}
//                 />
//                 <div className="UserInfo-name">
//                     {props.author.name}
//                 </div>
//             </div>
//             <div className="Comment-text">
//                 {props.text}
//             </div>
//             <div className="Comment-date">
//                 {format(props.date)}
//             </div>
//         </div>
//     );
// }

// const comment = {
//     date: new Date(),
//     text: 'I hope you enjoy learning React!',
//     author: {
//         name: 'Hello Kitty',
//         avatarUrl: 'https://placekitten.com/g/64/64',
//     },
// }

// ReactDOM.render(
//     < Comment 
//         date={comment.date}
//         text={comment.text}
//         author={comment.author}
//     />,
//     document.getElementById('root')
// );

function format(date) {
    return date.toLocaleDateString();
}

function Avatar(props) {
    return (
        <img className="Avatar" 
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}

function UserInfo(props) {
    return (
        <div className = "UserInfo" >
            <Avatar user={props.user} />
            <div className="UserInfo-name">
                {props.user.name}
            </div>
        </div>
    );
}

function Comment(props) {
    return (
        <div className="Comment">
            <UserInfo user={props.author} />
            <div className="Comment-text">
                {props.text}
            </div>
            <div className="Comment-date">
                {format(props.date)}
            </div>
        </div>
    );
}

const comment = {
    date: new Date(),
    text: 'I hope you enjoy learning React!',
    author: {
        name: 'Hello Kitty',
        avatarUrl: 'https://placekitten.com/g/64/64',
    },
}

ReactDOM.render(
    < Comment 
        date={comment.date}
        text={comment.text}
        author={comment.author}
    />,
    document.getElementById('root')
);

/*****
    Props are Read - Only
*****/
/* 
    Whether you declare a component as a
    function or a class, it must never modify its own props.Such functions are called“ pure” because they do not attempt to change their inputs, and always return the same result for the same inputs.
*/
// function sum(a, b) {
//     return a + b;
// }

/*
    Impure function
*/
// function withdraw(account, amount) {
//     account.total -= amount;
// }

/* 
    All React components must act like pure functions with respect to their props.
*/
