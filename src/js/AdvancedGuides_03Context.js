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
//   // React will find thte closest theme Provider above and use its value.
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