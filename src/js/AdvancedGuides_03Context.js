import React from 'react';
import ReactDOM from 'react-dom';

/*****
    When to Use Context
*****/
/*
    Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language. For example, in the code below we manually thread through a “theme” prop in order to style the Button component.
*/
// class App extends React.Component {
//   render() {
//     return <Toolbar theme="dark" />;
//   }
// }

// function Toolbar(props) {
//   // The Toolbar component must take an extra "theme" prop
//   // and pass it to the ThemeButton. This can become painful
//   // if every single button in the app needs to know the theme
//   // because it would have to be passed through all components.
//   return (
//     <div>
//       <ThemedButton theme={props.theme} />
//     </div>
//   );
// }

// class ThemedButton extends React.Component {
//   render() {
//     return <Button theme={this.props.theme} />;
//   }
// }

// function Button(props) {
//   return <button>{props.theme}</button>;
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

/*
    Using context, we can avoid passing props through intermediate elements.
*/
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
// const ThemeContext = React.createContext('light');

// class App extends React.Component {
//   render() {
//     // Use a Provider to pass the current theme to the tree below.
//     // Any component can read it, no matter how deep it is.
//     // In this example, we're passing "dark" as the current value. 
//     return (
//       <ThemeContext.Provider value="dark">
//         <Toolbar />
//       </ThemeContext.Provider>
//     );
//   }
// }

// // A component in the middle doesn't have to 
// // pass the theme down explicitly anymore.
// function Toolbar(props) {
//   return (
//     <div>
//       <ThemedButton />
//     </div>
//   );
// }

// class ThemedButton extends React.Component {
//   // Assign a contextType to read the current theme context.
//   // React will find the closest theme Provider above and use its value.
//   // In this example, the current theme is "dark". 
//   static contextType = ThemeContext;
//   render() {
//     return <Button theme={this.context} />;
//   }
// }

// function Button(props) {
//   return <button>{props.theme}</button>;
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

/*****
    Before You Use Context
*****/
/*
    Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.

    If you only want to avoid passing some props through many levels, component composition is often a simpler solution than context.

    For example, consider a Page component that passes a user and avatarSize prop several levels down so that deeply nested Link and Avatar components can read it.
*/

// <Page user={user} avatarSize={avatarSize} />
// // ... which renders ... 
// <PageLayout user={user} avatarSize={avatarSize} />
// // ... which renders ... 
// <NavigationBar user={user} avatarSize={avatarSize} />
// // ... which renders ... 
// <Link href={user.permalink}>
//  <Avatar user={user} size={avatarSize} />
// </Link>

/*
    One way to solve this issue without context is to pass down the Avatar component itself so that the intermediate components don’t need to know about the user or avatarSize props.
*/
// function Page(props) {
//   const user = props.user;
//   const userLink = (
//     <Link href={user.permalink}>
//       <Avatar user={user} size={props.avatarSize} />
//     </Link>
//   );
//   return <PageLayout userLink={userLink} />;
// }

// // Now, we have:
// <Page user={user} avatarSize={avatarSize} />
// // ... which renders ... 
// <PageLayout userLink={...} />
// // ... which renders ... 
// <NavigationBar userLink={...} />
// // ... which renders ... 
// {props.userLink}

/*
    With this change, only the top-most Page component needs to know about the Link and Avatar components’ use of user and avatarSize.

    This inversion of control can make your code cleaner in many cases by reducing the amount of props you need to pass through your application and giving more control to the root components. However, this isn’t the right choice in every case: moving more complexity higher in the tree makes those higher-level components more complicated and forces the lower-level components to be more flexible than you may want.

    You’re not limited to a single child for a component. You may pass multiple children, or even have multiple separate “slots” for children, as documented here.
*/
// function Page(props) {
//   const user = props.user;
//   const content = <Feed user={user} />;
//   const topBar = (
//     <NavigationBar>
//       <Link href={user.permalink}>
//         <Avatar user={user} size={props.avatarSize} />
//       </Link>
//     </NavigationBar>
//   );
//   return (
//     <PageLayout
//       topBar={topBar}
//       content={content}
//     />
//   );
// }

/*****
    API
*****/
/* React.createContent */
/*
    Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching Provider above it in the tree.

    The defaultValue argument is only used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them. Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.
*/
// const MyContext = React.createContent(defaultValue);

/* Context.Provider */
/*
    Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.

    Accepts a value prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

    All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. The propagation from Provider to its descendant consumers is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component bails out of the update.

    Changes are determined by comparing the new and old values using the same algorithm as Object.is.
*/
// <MyContext.Provider value={/* some value */}>

/* Class.contextType */
// class MyClass extends React.Component {
//     componentDidMount() {
//         let value = this.context;
//         /* perform a side-effect at mount using the value of MyContext */
//     }

//     componentDidUpdate() {
//         let value = this.context;
//         /* ... */
//     }

//     componentWillUnmount() {
//         let value = this.context;
//         /* ... */
//     }

//     render() {
//         let value = this.context;
//         /* render something based on the value of MyContext */
//     }
// } 
// MyClass.contextType = MyContext;

/*
    If you are using the experimental public class fields syntax, you can use a static class field to initialize your contextType.
*/
// class MyClass extends React.Component {
//     static contextType = MyContext;
//     render() {
//         let value = this.context;
//         /* render something based on the value */
//     }
// }

/* Context.Consumer */
/*
    A React component that subscribes to context changes. This lets you subscribe to a context within a function component.

    Requires a function as a child. The function receives the current context value and returns a React node. The value argument passed to the function will be equal to the value prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the value argument will be equal to the defaultValue that was passed to createContext().
*/

// <MyContext.Consumer>
//     {value => /* render something based on the context value */}
// </MyContext.Consumer>

/* Context.displayName */ 
/*
    Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context.

    For example, the following component will appear as MyDisplayName in the DevTools:
*/
// const MyContext = React.createContext(/* some value */);
// MyContext.displayName = 'MyDisplayName';

// <MyContext.Provider>    // "MyDisplayName.Provider" in DevTools
// <MyContext.Consumer>    // "MyDisplayName.Consumer" in DevTools

/*****
    Examples
*****/
// import {ThemeContext, themes} from './theme-context';
// import ThemedButton from './themed-button';

// // An intermediate component that uses ThemedButton
// function Toolbar(props) {
//     return (
//         <ThemedButton onClick={props.changeTheme}>
//             Change Theme
//         </ThemedButton>
//     );
// }

// class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             theme: themes.light
//         };
        
//         this.toggleTheme = () => {
//             this.setState(state => ({
//                 theme: 
//                 state.theme === themes.dark?
//                 themes.light : themes.dark,
//             }))
//         };
//     }

//     render() {
//         // The ThemedButton button inside the ThemeProvider
//         // uses the theme from state while the one outside uses the default dark theme
//         return (
//             <div>
//                 <ThemeContext.Provider value={this.state.theme}>
//                     <Toolbar changeTheme={this.toggleTheme} />
//                 </ThemeContext.Provider>
//                 <div>
//                     <ThemedButton />
//                 </div>
//             </div>
//         );
//     }
// }

// ReactDOM.render(<App />, document.getElementById('root'));

/* Updating Context from a Nested Component */
/*
    It is often necessary to update the context from a component that is nested somewhere deeply in the component tree. In this case you can pass a function down through the context to allow consumers to update the context.
*/
// import {ThemeContext, themes} from './theme-context';
// import ThemeTogglerButton from './theme-toggler-button';

// class App extends React.Component {
//     constructor(props) {
//         super(props);

//         this.toggleTheme = () => {
//             this.setState(state => ({
//                 theme: 
//                     state.theme === themes.dark?
//                         themes.light : themes.dark, 
//             }));
//         };

//         // State also contains the updater function so it will 
//         // be passed down into the context provider
//         this.state = {
//             theme: themes.light,
//             toggleTheme: this.toggleTheme,
//         };
//     }

//     render() {
//         // The entire state is passed to the provider
//         return (
//             <ThemeContext.Provider value={this.state}>
//                 <Content />
//             </ThemeContext.Provider>
//         )
//     };
// }

// function Content() {
//     return (
//         <div>
//             <ThemeTogglerButton />
//         </div>
//     );
// }

// ReactDOM.render(<App />, document.getElementById('root'));

/* Consuming Multiple Contexts */
// Theme context, default to light theme
const ThemeContext = React.createContext('light');

// Signed-in user context
const UserContext = React.createContext({
    name: 'Guest',
});

class App extends React.Component {
    render() {
        const {signedInUser, theme} = this.props;

        // App component that provides initial context values
        return (
            <ThemeContext.Provider value={theme}>
                <UserContext.Provider value={signedInUser}>
                    <Layout />
                </UserContext.Provider>
            </ThemeContext.Provider>
        );
    }
}

function Layout() {
    return (
        <div>
            <Sidebar />
            <Content />
        </div>
    );
}

// A component may consume multiple contexts
function Content() {
    return (
        <ThemeContext.Consumer>
            {theme =>
                <UserContext.Consumer>
                    {user => (
                        <ProfilePage user={user} theme={theme} />
                    )}
                </UserContext.Consumer>
            }
        </ThemeContext.Consumer>
    );
}

function Sidebar() {
    return (
        <div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">Setting</a></li>
                <li><a href="#">Help</a></li>
            </ul>
        </div>
    );
}

function ProfilePage(props) {
    return (
        <div>
            <h1>
                {props.user.name}
            </h1>
        </div>
    );
}

const user = {name: 'John'};

ReactDOM.render(
    <App 
        signedInUser={user}
        theme="dark"
    />,
    document.getElementById('root')
);

/*****
    Caveats
*****/
/*
    Because context uses reference identity to determine when to re - render, there are some gotchas that could trigger unintentional renders in consumers when a provider’ s parent re - renders.For example, the code below will re - render all consumers every time the Provider re - renders because a new object is always created
    for value.
*/
// class App extends React.Component {
//     render() {
//         return (
//             <Provider value={{something: 'something'}}>
//                 <Toolbar />
//             </Provider>
//         );
//     }
// }