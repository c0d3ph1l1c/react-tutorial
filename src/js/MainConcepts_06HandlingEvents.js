import React from 'react';
import ReactDOM from 'react-dom';

/* HTML */
/* 
<button onclick="activateLasers()">
    Activate Lasers 
</button> 
*/

/* React */
/* 
<button onClick={activateLasers}>
    Activate Lasers
</button> 
*/

/* HTML - return false to prevent default behavior */
/* 
<a href="#" onclick="console.log('The link was clicked); return false">
    Click me
</a>
*/

/* React - must call preventDefault explicitly */
/* 
    When using React you should generally not need to call addEventListener to add listeners to a DOM element after it is created.Instead, just provide a listener when the element is initially rendered.
*/
// function ActionLink() {
//     function handleClick(e) {
//         e.preventDefault();
//         console.log('The link was clicked');
//     }

//     return (
//         <a href="#" onClick={handleClick}>
//             Click me
//         </a>
//     )
// }

/* 
    Common pattern - event handler to be a method on the class
*/
// class Toggle extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isToggleOn: true
//         };

//         /* This binding is necessary to make 'this' work in the callback */
//         this.handleClick = this.handleClick.bind(this);
//     }

//     handleClick() {
//         this.setState(state => ({
//             isToggleOn: !state.isToggleOn
//         }));
//     }

//     render() {
//         return (
//             <button onClick={this.handleClick}>
//                 {this.state.isToggleOn? 'ON' : 'OFF'}
//             </button>
//         );
//     }
// }

// ReactDOM.render(
//     <Toggle />,
//     document.getElementById('root')
// );

/* Experimental public class fields syntax */
// class LoggingButton extends React.Component {
//     /* This syntax ensures 'this' is bound within handleClick.
//         Warning: this is "experimental" syntax . */
//     handleClick = () => {
//         console.log('this is:', this);
//     }

//     render() {
//         return (
//             <button onClick={this.handleClick}>
//                 Click me
//             </button>
//         );
//     }
// }

// ReactDOM.render(
//     <LoggingButton />,
//     document.getElementById('root')
// );

/* Use an arrow function in the callback */
/* 
    The problem with this syntax is that a different callback is created each time the LoggingButton renders.In most cases, this is fine.However, if this callback is passed as a prop to lower components, those components might do an extra re - rendering.We generally recommend binding in the constructor or using the class fields syntax, to avoid this sort of performance problem.
*/
class LoggingButton extends React.Component {
    handleClick() {
        console.log('this is:', this);
    }

    render() {
        /* This syntax ensures 'this' is bound within handleClick */
        return (
            <button onClick={(e) => this.handleClick(e)}>
                Click me
            </button>
        );
    }
}

ReactDOM.render(
    <LoggingButton />,
    document.getElementById('root')
);

/*****
    Passing Arguments to Event Handlers
*****/
/* 
    In both cases, the e argument representing the React event will be passed as a second argument after the ID.With an arrow
    function, we have to pass it explicitly, but with bind any further arguments are automatically forwarded.
*/
// <button onClick={(e) => this.deleteRow(id,e)}>Delete Row</button>
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button> 