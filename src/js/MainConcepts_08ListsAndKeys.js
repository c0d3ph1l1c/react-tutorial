import React from 'react';
import ReactDOM from 'react-dom';

// const numbers = [1, 2, 3, 4, 5];
// const doubled = numbers.map((number) => number * 2);
// console.log(doubled);

/*****
    Rendering Multiple Components
*****/
// const numbers = [1, 2, 3, 4, 5];
// const listItems = numbers.map((number) => 
//     <li>{number}</li>
// );
// ReactDOM.render(
//     <ul>{listItems}</ul>,
//     document.getElementById('root')
// );

/*****
    Basic List Component
*****/
// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => 
//         <li>{number}</li>
//     );
//     return (
//         <ul>{listItems}</ul>
//     );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

/*
    When you run this code, you’ ll be given a warning that a key should be provided for list items.A“ key” is a special string attribute you need to include when creating lists of elements.
*/
// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => 
//         <li key={number.toString()}>
//             {number}
//         </li>
//     );
//     return (
//         <ul>{listItems}</ul>
//     );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

/*****
    Keys
*****/
/* 
    Keys help React identify which items have changed, are added, or are removed.Keys should be given to the elements inside the array to give the elements a stable identity.
*/
/*
    The best way to pick a key is to use a string that uniquely identifies a list item among its siblings.Most often you would use IDs from your data as keys
*/
// const todoItems = todos.map((todo) => 
//     <li key={todo.id}>
//         {todo.text}
//     </li>
// );
/*
    When you don’ t have stable IDs for rendered items, you may use the item index as a key as a last resort

    We don’ t recommend using indexes for keys if the order of items may change.This can negatively impact performance and may cause issues with component state. Check out Robin Pokorny’ s article for an in -depth explanation on the negative impacts of using an index as a key.If you choose not to assign an explicit key to list items then React will
    default to using indexes as keys.
*/
// const todoItems = todos.map((todo, index) => 
//     // Only do this if items have no stable IDs
//     <li key={index}>
//         {todo.text}
//     </li>
// );

/*****
    Extracting Components with Keys
*****/
/* Keys only make sense in the context of the surrounding array */
/* Incorrect key usage*/
// function ListItem(props) {
//     const value = props.value;
//     return (
//         // Wrong! There is no need to specify the key here:
//         <li keys={value.toString()}>
//             {value}
//         </li>
//     );
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => 
//         // Wrong! The key should have been specified here:
//         <ListItem value={number} />
//     );
//     return (
//         <ul>
//             {listItems}
//         </ul>
//     );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

/* Correct Key Usage */
// function ListItem(props) {
//     /* Correct! There is no need to specify the key here: */
//     return <li>{props.value} </li>;
// }

// function NumberList(props) {
//     const numbers = props.numbers;
//     const listItems = numbers.map((number) => 
//         /* Correct! key should be specified inside the array. */
//         <ListItem key={number.toString()} 
//                   value={number} />
//     );
//     return (
//         <ul>
//             {listItems}
//         </ul>
//     );
// }

// const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(
//     <NumberList numbers={numbers} />,
//     document.getElementById('root')
// );

/*****
    Keys Must Only Be Unique Among Siblings
******/
/* 
    Keys used within arrays should be unique among their siblings.However they don’ t need to be globally unique.We can use the same keys when we produce two different arrays.
*/
// function Blog(props) {
//     const sidebar = (
//         <ul>
//             {props.posts.map(post => 
//                 <li key={post.id}>
//                     {post.title}
//                 </li>    
//             )}
//         </ul>
//     );
//     const content = props.posts.map((post) =>
//         <div key={post.id}>
//             <h3>{post.title}</h3>
//             <p>{post.content}</p>
//         </div>
//     );
//     return (
//         <div>
//             {sidebar}
//             <hr />
//             {content}
//         </div>
//     );
// }

// const posts = [
//     {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
//     {id: 2, title: 'Installation', content: 'You can install React from npm'},
// ];
// ReactDOM.render(
//     <Blog posts={posts} />,
//     document.getElementById('root')
// );

/* 
    Keys serve as a hint to React but they don’t get passed to your components.If you need the same value in your component, pass it explicitly as a prop with a different name.

    With the example above, the Post component can read props.id, but not props.key.
*/
// const content = posts.map((post) => 
//     <Post 
//         key={post.id}
//         id={post.id}
//         title={post.title} />
// );

/*****
    Embedding map() in JSX
*****/
function ListItem(props) {
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map((number) => 
                <ListItem key={number.toString()}
                value={number} />
                )}
        </ul>
    )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);