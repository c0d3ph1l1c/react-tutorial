import React from 'react';
import ReactDOM from 'react-dom';

/* 
    Fragments let you group a list of children without adding extra nodes to the DOM.
*/
// render() {
//   return (
//     <React.Fragments>
//       <ChildA />
//       <ChildB />
//       <ChildC />
//     </React.Fragments>
//   );
// }

/*****
    Motivation
*****/
/*
    A common pattern is for a component to return a list of children. Take this example React snippet.
*/
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    )
  }
}

/*
    <Columns /> would need to return multiple <td> elements in order for the rendered HTML to be valid. If a parent div was used inside the render() of <Columns />, then the resulting HTML will be invalid:

    class Column extends React.Component {
      render() {
        return (
          <div>
            <td>Hello</td>
            <td>World</td>
          </div>
        );
      }
    }

    results in a <Table /> output of:

    <table>
      <tr>
        <div>
          <td>Hello</td>
          <td>World</td>
        </div>
      </tr>
    </table>
*/

/*****
    Usage
*****/
// class Columns extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <td>Hello</td>
//         <td>World</td>
//       </React.Fragment>
//     );
//   }
// }

// ReactDOM.render(
//   <Table />,
//   document.getElementById('root')
// );

/*
  which results in a correct <Table /> output of:

  <table>
    <tr>
      <td>Hello</td>
      <td>World</td>
    </tr>
  </table>
*/

/* Short Syntax */
// class Columns extends React.Component {
//   render() {
//     return (
//       <>
//         <td>Hello</td>
//         <td>World</td>
//       </>
//     );
//   }
// }

// ReactDOM.render(
//   <Table />,
//   document.getElementById('root')
// );

/* Keyed Fragments */
/*
    Fragments declared with the explicit <React.Fragment> syntax may have keys. A use case for this is mapping a collection to an array of fragments — for example, to create a description list.

    key is the only attribute that can be passed to Fragment. In the future, we may add support for additional attributes, such as event handlers.
*/
// function Glossary(props) {
//   return (
//     <dl>
//       {props.items.map(item => (
//         // Without the `key`, React will fire a key warning
//         <React.Fragment key={item.id}>
//           <dt>{item.term}</dt>
//           <dd>{item.description}</dd>
//         </React.Fragment>
//       ))}
//     </dl>
//   );
// }

// const items = [
//   { id: 1, term: 'Item 1', description: 'This is item 1' },
//   { id: 2, term: 'Item 2', description: 'This is item 2' },
//   { id: 3, term: 'Item 3', description: 'This is item 3' },
//   { id: 4, term: 'Item 4', description: 'This is item 4' },
// ];

// ReactDOM.render(
//   <Glossary items={items} />,
//   document.getElementById('root')
// );

/*****
      Live Demo
*****/
function Example() {
  return (
    <>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Anoher heading</h2>
      Even more text.
    </>
  );
}
ReactDOM.render(
  <Example />, 
  document.getElementById('root')
);