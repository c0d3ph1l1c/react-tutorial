import React from 'react';
import ReactDOM from 'react-dom';

/*****
    Examples
*****/
/*
    If the only way your component ever changes is when the props.color or the state.count variable changes, you could have shouldComponentUpdate check that.
*/
// class CounterButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {count: 1};
//   }

//   shouldComponentUpdate(nextProps, nextState) {
//     if(this.props.color !== nextProps.color) {
//       return true;
//     }
//     if(this.state.count !== nextState.count) {
//       return true;
//     }
//     return false;
//   }

//   render() {
//     return (
//       <button
//         color={this.props.color}
//         onClick={() => this.setState(state => ({count: state.count + 1}))}>
//         Count: {this.state.count}
//       </button>
//     );
//   }
// }

// ReactDOM.render(
//   <CounterButton color="#0ff" />,
//   document.getElementById('root')
// );

/*
    In this code, shouldComponentUpdate is just checking if there is any change in props.color or state.count. If those values don’t change, the component doesn’t update. If your component got more complex, you could use a similar pattern of doing a “shallow comparison” between all the fields of props and state to determine if the component should update. This pattern is common enough that React provides a helper to use this logic - just inherit from React.PureComponent. So this code is a simpler way to achieve the same thing:
*/
// class CounterButton extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {count: 1};
//   }

//   render() {
//     return (
//       <button
//         color={this.props.color}
//         onClick={() => this.setState(state => ({count: state.count + 1}))}>
//         Count: {this.state.count}
//       </button>
//     );
//   }
// }

// ReactDOM.render(
//   <CounterButton color="#0ff" />,
//   document.getElementById('root')
// );

/*
    Most of the time, you can use React.PureComponent instead of writing your own shouldComponentUpdate. It only does a shallow comparison, so you can’t use it if the props or state may have been mutated in a way that a shallow comparison would miss.

    This can be a problem with more complex data structures. For example, let’s say you want a ListOfWords component to render a comma-separated list of words, with a parent WordAdder component that lets you click a button to add a word to the list. This code does not work correctly:
*/
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This section is bad style and cause a bug
    const words = this.state.words;
    words.push('markler');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

ReactDOM.render(
  <WordAdder />,
  document.getElementById('root')
);

/*
    The problem is that PureComponent will do a simple comparison between the old and new values of this.props.words. Since this code mutates the words array in the handleClick method of WordAdder, the old and new values of this.props.words will compare as equal, even though the actual words in the array have changed. The ListOfWords will thus not update even though it has new words that should be rendered.
*/

/*****
    The Power Of Not Mutating Data
*****/
/*
    The simplest way to avoid this problem is to avoid mutating values that you are using as props or state. For example, the handleClick method above could be rewritten using concat as:
*/
// handleClick() {
//   this.setState(state => ({
//     words: state.words.concat(['markler'])
//   }));
// }

/*
    ES6 supports a spread syntax for arrays which can make this easier. If you’re using Create React App, this syntax is available by default.
*/
// handleClick() {
//   this.setState(state => ({
//     words: [...state.words, 'markler'],
//   }));
// };

/*
    You can also rewrite code that mutates objects to avoid mutation, in a similar way. For example, let’s say we have an object named colormap and we want to write a function that changes colormap.right to be 'blue'. We could write:
*/
// function updateColorMap(colormap) {
//   colormap.right = 'blue';
// }

/*
    To write this without mutating the original object, we can use Object.assign method:
*/
// function updateColorMap(colormap) {
//   return Object.assign({}, colormap, {right: 'blue'});
// }

/*
    updateColorMap now returns a new object, rather than mutating the old one. Object.assign is in ES6 and requires a polyfill.

    There is a JavaScript proposal to add object spread properties to make it easier to update objects without mutation as well:
*/
// function updateColorMap(colormap) {
//   return {...colormap, right: 'blue'};
// }

/*
    If you’re using Create React App, both Object.assign and the object spread syntax are available by default.

    When you deal with deeply nested objects, updating them in an immutable way can feel convoluted. If you run into this problem, check out Immer or immutability-helper. These libraries let you write highly readable code without losing the benefits of immutability.
*/

