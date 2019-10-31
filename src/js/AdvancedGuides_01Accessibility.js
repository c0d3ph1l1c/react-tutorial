import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';

/*****
    WAI-ARIA
*****/
/*
    Note that all aria-* HTML attributes are fully supported in JSX. Whereas most DOM properties and attributes in React are camelCased, these attributes should be hyphen-cased (also known as kebab-case, lisp-case, etc) as they are in plain HTML:

    <input
      type="text"
      aria-label={labelText}
      aria-required="true"
      onChange={onChangeHandler}
      value={inputValue}
      name="name"
    /> 
*/

/*****
    Semantic HTML
*****/
// function ListItem({item}) {
//   return (
//     <Fragment>
//       <dt>{item.term}</dt>
//       <dd>{item.description}</dd>
//     </Fragment>
//   );
// }

// function Glossary(props) {
//   return (
//     <dl>
//       {props.items.map(item => (
//         <ListItem item={item} key={item.id} />
//       ))}
//     </dl>
//   );
// }

// const items = [
//   {id: 1, term: 'Item1', description: 'This is item 1'},
//   {id: 2, term: 'Item2', description: 'This is item 2'},
//   {id: 3, term: 'Item3', description: 'This is item 3'},
//   {id: 4, term: 'Item4', description: 'This is item 4'},
// ];

// ReactDOM.render(
//   <Glossary items={items} />,
//   document.getElementById('root')
// );

/*
    You can map a collection of items to an array of fragments as you would any other type of element as well
*/
// function Glossary(props) {
//   return (
//     <dl>
//       {props.items.map(item => (
//         // Fragments should also have a `key` prop when mapping collections
//         <Fragment key={item.id}>
//           <dt>{item.term}</dt>
//           <dd>{item.description}</dd>
//         </Fragment>
//       ))}
//     </dl>
//   );
// }

// const items = [
//   {id: 1, term: 'Item1', description: 'This is item 1'},
//   {id: 2, term: 'Item2', description: 'This is item 2'},
//   {id: 3, term: 'Item3', description: 'This is item 3'},
//   {id: 4, term: 'Item4', description: 'This is item 4'},
// ];

// ReactDOM.render(
//   <Glossary items={items} />,
//   document.getElementById('root')
// );

/*
    When you don’t need any props on the Fragment tag you can use the short syntax, if your tooling supports it
*/
// function ListItem({item}) {
//   return (
//     // Short syntax
//     <>
//       <dt>{item.term}</dt>
//       <dd>{item.description}</dd>
//     </>
//   );
// }

// function Glossary(props) {
//   return (
//     <dl>
//       {props.items.map(item => (
//         <ListItem item={item} key={item.id} />
//       ))}
//     </dl>
//   );
// }

// const items = [
//   {id: 1, term: 'Item1', description: 'This is item 1'},
//   {id: 2, term: 'Item2', description: 'This is item 2'},
//   {id: 3, term: 'Item3', description: 'This is item 3'},
//   {id: 4, term: 'Item4', description: 'This is item 4'},
// ];

// ReactDOM.render(
//   <Glossary items={items} />,
//   document.getElementById('root')
// );

/*****
    Accessible Forms
*****/
/* Labeling */
/*
    Although these standard HTML practices can be directly used in React, note that the for attribute is written as htmlFor in JSX:

    <label htmlFor="nameInput">Name:</label>
    <input id="nameInput" type="text" name="name" /> 
*/

/* Notifying the user of errors */
/*
    Error situations need to be understood by all users.
*/

/*****
    Focus Control
*****/
/* Keyboard focus and focus outline */
/*
    Only ever use CSS that removes this outline, for example by setting outline: 0, if you are replacing it with another focus outline implementation.
*/

/* Mechanisms to skip to desired content */
/*
    Provide a mechanism to allow users to skip past navigation sections in your application as this assists and speeds up keyboard navigation.

    Also use landmark elements and roles, such as <main> and <aside>, to demarcate page regions as assistive technology allow the user to quickly navigate to these sections.
*/

/* Programmatically managing focus */
/*
    Our React applications continuously modify the HTML DOM during runtime, sometimes leading to keyboard focus being lost or set to an unexpected element. In order to repair this, we need to programmatically nudge the keyboard focus in the right direction. For example, by resetting keyboard focus to a button that opened a modal window after that modal window is closed.

    To set focus in React, we can use Refs to DOM elements.

    Using this, we first create a ref to an element in the JSX of a component class.
*/
// class CustomTextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     // Create a ref to store the textInput DOM element
//     this.textInput = React.createRef();
//     this.focus = this.focus.bind(this);
//   }

//   render() {
//     /* Use the `ref` callback to store a reference to the text input DOM element in an instance filed (for example, this.textInput) */
//     return (
//       <input
//         type="text"
//         ref={this.textInput}
//       />
//     );
//   }
// }

// const textInput = <CustomTextInput />;

// ReactDOM.render(
//   textInput,
//   document.getElementById('root')
// );

/*
    Then we can focus it elsewhere in our component when needed.

    focus() {
      //Explicitly focus the text input using the raw DOM API 
      //Note: we're accessing "current" to get the DOM node 
      this.textInput.current.focus();
      console.log(this.textInput.current);
    }
*/

/*
    Sometimes a parent component needs to set focus to an element in a child component. We can do this by exposing DOM refs to parent components through a special prop on the child component that forwards the parent’s ref to the child’s DOM node
*/
// function CustomTextInput(props) {
//   return (
//     <div>
//       <input ref={props.inputRef} />
//     </div>
//   );
// }

// class Parent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.inputElement = React.createRef();
//   }
//   render() {
//     return (
//       <CustomTextInput inputRef={this.inputElement} />
//     );
//   }
// }

// // Now you can set focus when required.
// this.inputElement.current.focus();

/*****
    Mouse and pointer events
*****/
// class OuterClickExample extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { isOpen: false };
//     this.toggleContainer = React.createRef();

//     this.onClickHandler = this.onClickHandler.bind(this);
//     this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
//   }

//   componentDidMount() {
//     window.addEventListener('click', this.onClickOutsideHandler);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('click', this.onClickOutsideHandler);
//   }

//   onClickHandler() {
//     this.setState(currentState => ({
//       isOpen: !currentState.isOpen
//     }));
//   }

//   onClickOutsideHandler(event) {
//     if(this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
//       this.setState({ isOpen: false });
//     }
//   }

//   render() {
//     return (
//       <div ref={this.toggleContainer}>
//         <button onClick={this.onClickHandler}>Select an option</button>
//         {this.state.isOpen && (
//           <ul>
//             <li>Option 1</li>
//             <li>Option 2</li>
//             <li>Option 3</li>
//           </ul>
//         )}
//       </div>
//     );
//   }
// }

// ReactDOM.render(
//   <OuterClickExample />,
//   document.getElementById('root')
// );

/*
    This may work fine for users with pointer devices, such as a mouse, but operating this with the keyboard alone leads to broken functionality when tabbing to the next element as the window object never receives a click event. This can lead to obscured functionality which blocks users from using your application.

    The same functionality can be achieved by using appropriate event handlers instead, such as onBlur and onFocus.
*/
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if 
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeoutId);
  }

  render() {
    // React assists us by bubbling the blur and 
    // focus events to the parents.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>

        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>    
    );
  }
}

ReactDOM.render(
  <BlurExample />,
  document.getElementById('root')
);

