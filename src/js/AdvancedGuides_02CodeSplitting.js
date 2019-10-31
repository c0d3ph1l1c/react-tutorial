import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

/* App: */
// // app.js
// import { add } from './math.js';

// console.log(add(16, 26));   //42

// // math.js
// export function add(a, b) {
//   return a + b;
// }

/* Bundle */
// function add(a, b) {
//   return a + b;
// }

// console.log(add(16, 26));   // 42

/*****
    Code Splitting
*****/
/* Before */
// import { add } from './math';

// console.log(add(16, 26));

/* After */
// import('./math').then(math => {
//   console.log(math.add(16, 26));
// });

/*****
    React.lazy
*****/
/*
    The React.lazy function lets you render a dynamic import as a regular component.
*/
/* Before */
// import OtherComponent from './OtherComponent';

/* After */
// const OtherComponent = React.lazy(() => import('./OtherComponent'));

// function MyComponent() {
//   return (
//     <div>
//       <Suspense fallback={<div>Loading...</div>}>
//         <OtherComponent />
//       </Suspense>
//     </div> 
//   );
// }

// ReactDOM.render(
//   <MyComponent />,
//   document.getElementById('root')
// );

/* 
    The fallback prop accepts any React elements that you want to render while waiting for the component to load. You can place the Suspense component anywhere above the lazy component. You can even wrap multiple lazy components with a single Suspense component.
*/
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('root')
);

/* Error boundaries */
/* 
    If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with Error Boundaries. Once you’ve created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there’s a network error.

    import MyErrorBoundary from './MyErrorBoundary';
    const OtherComponent = React.lazy(() => import('./OtherComponent'));
    const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

    function MyComponent() {
      return (
        <div>
          <MyErrorBoundary>
            <Suspense fallback={<div>Loading...</div>}>
              <section>
                <OtherComponent />
                <AnotherComponent />
              </section>
            </Suspense>
          </MyErrorBoundary>
        </div>
      );
    }

    ReactDOM.render(
      <MyComponent />,
      document.getElementById('root')
    );
*/

/*****
    Route-based code splitting 
*****/
/*
    Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won’t disrupt the user experience.

    A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

    Here’s an example of how to setup route-based code splitting into your app using libraries like React Router with React.lazy.


    import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
    import React, {Suspense, lazy} from 'react';

    const Home = lazy(() => import('./routes/Home'));
    const About = lazy(() => import('./routes/About'));
    
    const App = () => (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={about}/>
          </Switch>
        </Suspense>
      </Router>
    );

    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
*/

/*****
    Named Exports
*****/
/*
    React.lazy currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.
*/
// ManyComponents.js
// export const MyComponent = /* ... */;
// export const MyUnusedComponent = /* ... */;

// // MyComponent.js
// export { MyComponent as default } from "./ManyComponents.js";

// // MyApp.js
// import React, { lazy } from 'react';
// const MyComponent = lazy(() => import('./MyComponent.js'));