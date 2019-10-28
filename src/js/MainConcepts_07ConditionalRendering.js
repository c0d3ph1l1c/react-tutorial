import React from 'react';
import ReactDOM from 'react-dom';

// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
// }

// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if(isLoggedIn) {
//         return <UserGreeting />;
//     } 
//     return <GuestGreeting />;
// }

// ReactDOM.render(
//     // Try changing to isLoggedIn={true}:
//     <Greeting isLoggedIn={false} />,
//     document.getElementById('root')
// );

/*****
    Element Variables 
*****/ 
// function UserGreeting(props) {
//     return <h1>Welcome back!</h1>;
// }

// function GuestGreeting(props) {
//     return <h1>Please sign up.</h1>;
// }

// function Greeting(props) {
//     const isLoggedIn = props.isLoggedIn;
//     if (isLoggedIn) {
//         return <UserGreeting /> ;
//     }
//     return <GuestGreeting /> ;
// }

// function LoginButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Login
//         </button>
//     );
// }

// function LogoutButton(props) {
//     return (
//         <button onClick={props.onClick}>
//             Logout
//         </button>
//     );
// }

// class LoginControl extends React.Component {
//     constructor(props) {
//         super(props);
//         this.handleLoginClick = this.handleLoginClick.bind(this);
//         this.handleLogoutClick = this.handleLogoutClick.bind(this);
//         this.state = {isLoggedIn: false};
//     }

//     handleLoginClick() {
//         this.setState({isLoggedIn: true});
//     }

//     handleLogoutClick() {
//         this.setState({isLoggedIn: false});
//     }

//     render() {
//         const isLoggedIn = this.state.isLoggedIn;
//         let button;

//         if(isLoggedIn) {
//             button = <LogoutButton onClick={this.handleLogoutClick} />
//         } else {
//             button = <LoginButton onClick = {this.handleLoginClick} />
//         }

//         return (
//             <div>
//                 <Greeting isLoggedIn={isLoggedIn} />
//                 {button}
//             </div>
//         );
//     }
// }

// ReactDOM.render(
//     <LoginControl />,
//     document.getElementById('root')
// );

/*****
    Inline If with Logical && Operator
*****/
/* 
    It works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.
    Therefore, if the condition is true, the element right after && will appear in the output.If it is false, React will ignore and skip it.
*/
// function Mailbox(props) {
//     const unreadMessages = props.unreadMessages;
//     return (
//         <div>
//             <h1>Hello!</h1>
//             {unreadMessages.length > 0 &&
//                 <h2>
//                     You have {unreadMessages.length} unread messages.
//                 </h2>
//             }
//         </div>
//     );
// }

// const messages = ['React', 'Re: React', 'Re:Re: React'];
// ReactDOM.render(
//     <Mailbox unreadMessages={messages} />,
//     document.getElementById('root')
// );

/*****
    Inline If - Else with Conditional Operator
*****/
/* Conditionally render a small block of text */
// render() {
//     const isLoggedIn = this.StaticRange.isLoggedIn;
//     return (
//         <div>
//             The user is <b>{isLoggedIn? 'currently' : 'not'}</b> logged in.
//         </div>
//     );
// }

/* Can also be used for larger expressions although it is less obvious what’s going on */
// render() {
//     const isLoggedIn = this.state.isLoggedIn;
//     return ({
//         <div>
//         {isLoggedIn? (
//             <LogoutButton onClick={this.handleLogoutClick} />
//         ) : (
//             <LoginButton onClick={this.handleLoginClick} />
//         )}
//         </div>
//     });
// }

/*****
    Preventing Component from Rendering
*****/
/* 
    In rare cases you might want a component to hide itself even though it was rendered by another component.To do this return null instead of its render output.
*/
function WarningBanner(props) {
    if(!props.warn) {
        return null;
    }

    return (
        <div className="warning">
            Warning!
        </div>
    )
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: true };
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(state => ({
            showWarning: !state.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}
ReactDOM.render(
    <Page />,
    document.getElementById('root')
);