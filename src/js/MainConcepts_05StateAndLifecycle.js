import React from 'react';
import ReactDOM from 'react-dom';

/* Encapsulating how the clock looks */
// function Clock(props) {
//     return (
//         <div>
//             <h1>Hello, world!</h1>
//             <h2>It is {props.date.toLocaleString()}</h2>
//         </div>
//     )
// }

// function tick() {
//     ReactDOM.render(
//         <Clock date={new Date()} />,
//         document.getElementById('root')
//     );
// } 

// setInterval(tick, 1000);

/*****
    Converting a Function to a Class
*****/
// class Clock extends React.Component {
//     constructor(props) {
//         super(props);
//         /*****
//             Adding Local State to a Class 
//         *****/
//         this.state = {
//             date: new Date()
//         };
//     }

//     /*****
//         Adding Lifecycle Methods to a Class
//     *****/
//     componentDidMount() {
//         this.timerID = setInterval(
//             () => this.tick(), 
//             1000
//         );
//     }

//     /*****
//         Adding Lifecycle Methods to a Class
//     *****/
//     componentWillUnmount() {
//         clearInterval(this.timerID);
//     }

//     /*****
//         Adding Lifecycle Methods to a Class
//     *****/
//     tick() {
//         this.setState({
//             date: new Date()
//         });
//     }

//     /*****
//         Adding Local State to a Class 
//     *****/
//     render() {
//         return (
//             <div>
//                 <h1>Hello, world!</h1>
//                 <h2>It is {this.state.date.toLocaleString()}</h2>
//             </div>
//         );
//     }
// }

// ReactDOM.render(
//     /*****
//         Adding Local State to a Class 
//     *****/
//     <Clock />,
//     document.getElementById('root')
// );

/*****
    Using State Correctly
*****/
/* Do Not Modify State Directly */
/* Wrong */
// this.state.comment = 'Hello';

/* Correct */
// this.setState({
//     comment: 'Hello'
// });

/* State Updates May Be Asynchronous */
/* Wrong */
// this.setState({
//     counter: this.state.counter + this.props.increment,
// });

/* Correct */
// this.setState((state, props) => ({
//     counter: state.counter + props.increment
// }));

/* State Updates are Merged */
/* 
    The merging is shallow, so this.setState({comments}) leaves this.state.posts intact, but completely replaces this.state.comments. 
*/
// constructor(props) {
//     super(props);
//     this.state = {
//         posts: [],
//         comments: []
//     };
// }

// componentDidMount() {
//     fetchPosts().then(response => {
//         this.setState({
//             posts: response.posts
//         });
//     });

//     fetchComments().then(response => {
//         this.setState({
//             comments: response.comments
//         });
//     });
// }

/*****
    The Data Flows Down
*****/
function FormattedDate(props) {
    return <h2>It is {props.date.toLocaleTimeString()}</h2>;
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <FormattedDate date={this.state.date} />
            </div>
        );
    }
}

/* 1 */
// ReactDOM.render(
//     <Clock />,
//     document.getElementById('root')
// );

/* 2 - All components are truly isolated*/
function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);