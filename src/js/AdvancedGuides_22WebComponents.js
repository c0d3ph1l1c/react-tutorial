import React from 'react';
import ReactDOM from 'react-dom';

/*
    React and Web Components are built to solve different problems. Web Components provide strong encapsulation for reusable components, while React provides a declarative library that keeps the DOM in sync with your data. The two goals are complementary. As a developer, you are free to use React in your Web Components, or to use Web Components in React, or both.

    Most people who use React don’t use Web Components, but you may want to, especially if you are using third-party UI components that are written using Web Components.
*/

/*****
    Using Web Components in React
*****/
/*
    Note:
    Web Components often expose an imperative API. For instance, a video Web Component might expose play() and pause() functions. To access the imperative APIs of a Web Component, you will need to use a ref to interact with the DOM node directly. If you are using third-party Web Components, the best solution is to write a React component that behaves as a wrapper for your Web Component.

    Events emitted by a Web Component may not properly propagate through a React render tree. You will need to manually attach event handlers to handle these events within your React components.
*/
// class HelloMessage extends React.Component {
//   render() {
//     return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
//   }
// }

/*
    One common confusion is that Web Components use “class” instead of “className”.
*/
// function BrickFlipbox() {
//   return (
//     <brick-flipbox class="demo">
//       <div>front</div>
//       <div>back</div>
//     </brick-flipbox>
//   );
// }

/*****
    Using React in your Web Components
*****/
// class XSearch extends HTMLElement {
//   connectedCallback() {
//     const mountPoint = document.createElement('span');
//     this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

//     const name = this.getAttribute('name');
//     const url = 'https://www.google.com/search?q=' + encodeURIcomponent(name);
//     ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
//   }
// }
// customElements.define('x-search', XSearch);

/*
    Note:
    This code will not work if you transform classes with Babel. See this issue for the discussion. Include the custom-elements-es5-adapter before you load your web components to fix this issue.
*/