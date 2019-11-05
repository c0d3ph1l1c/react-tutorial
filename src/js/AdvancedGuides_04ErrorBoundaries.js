import React from 'react';
import ReactDOM from 'react-dom';

/***** 
    Introducing Error Boundaries
*****/
/*
    Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

    Error boundaries do not catch errors for:

    - Event handlers (learn more)
    - Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
    - Server side rendering
    - Errors thrown in the error boundary itself (rather than its children)

    A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown. Use componentDidCatch() to log error information.
*/
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state - { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI
//     return { hasError: true };
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     logErrorToMyService(error, errorInfo);
//   }

//   render() {
//     if(this.state.hasError) {
//       // You can render any custom fallback UI
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }

// <ErrorBoundary>
//   <MyWidget />
// </ErrorBoundary>

/*
    Error boundaries work like a JavaScript catch {} block, but for components. Only class components can be error boundaries. In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.

    Note that error boundaries only catch errors in the components below them in the tree. An error boundary can’t catch an error within itself. If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it. This, too, is similar to how catch {} block works in JavaScript.
*/

/*****
    Live Demo
*****/
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      error: null, 
      errorInfo: null 
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }

  render() {
    if(this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whitespace: 'pre-wrap'}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally just render children
    return this.props.children;
  }
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter : 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }

  render() {
    if(this.state.counter === 5) {
      // Simulate a JS Error
      throw new Error('I crashed!');
    }
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>
  }
}

function App() {
  return (
    <div>
      <p>
        <b>
          This is an example of error boundary in React 16.
          <br /><br />
          Click on the numbers to increase the counter.
          <br />
          The counter is programmed to throw when it reaches 5. This simulate a Javascript error in component.
        </b>
      </p>
      <hr />
      <ErrorBoundary>
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <BuggyCounter />
        <BuggyCounter />
      </ErrorBoundary>
      <hr />
      <p>These two counters are each inside of their own boundary. So if one crashes, the other is not affected.</p>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
      <ErrorBoundary>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

/*****
    Where to Place Error Boundaries
*****/
/*
    The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like server-side frameworks often handle crashes. You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.
*/

/*****
    New Behavior for Uncaught Errors
*****/
/*
    This change has an important implication. As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.

    We debated this decision, but in our experience it is worse to leave corrupted UI in place than to completely remove it. For example, in a product like Messenger leaving the broken UI visible could lead to somebody sending a message to the wrong person. Similarly, it is worse for a payments app to display a wrong amount than to render nothing.
*/

/*****
    How About try/catch?
*****/
/*
    try / catch is great but it only works for imperative code:
*/
// try {
//   showButton();
// } catch(error) {
//   // ...
// }
/*
    However, React components are declarative and specify what should be rendered:
*/

// <Button />

/*
    Error boundaries preserve the declarative nature of React, and behave as you would expect. For example, even if an error occurs in a componentDidUpdate method caused by a setState somewhere deep in the tree, it will still correctly propagate to the closest error boundary.
*/

/*****
    How About Event Handlers?
*****/
/*
    Error boundaries do not catch errors inside event handlers.

    React doesn’t need error boundaries to recover from errors in event handlers. Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

    If you need to catch an error inside event handler, use the regular JavaScript try / catch statement:
*/
// class MyComponent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { error: null };
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     try {
//       // Do something that could throw
//     } catch(error) {
//       this.setState({ error });
//     }
//   }

//   render() {
//     if(this.state.error) {
//       return <h1>Caught an error.</h1>
//     }
//     return <div onClick={this.handleClick}>Click Me</div>
//   }
// }

/*****  
    Naming Changes from React 15
*****/
/*
    React 15 included a very limited support for error boundaries under a different method name: unstable_handleError. This method no longer works, and you will need to change it to componentDidCatch in your code starting from the first 16 beta release.
*/