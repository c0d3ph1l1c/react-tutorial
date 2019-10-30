import React from 'react';
import ReactDOM from 'react-dom';

import '../scss/MainConcepts_12ThinkingInReact.scss';

/*****
    Step 1: Break The UI Into A Component Hierarchy
*****/
/*
  FilterableProductTable
      SearchBar
      ProductTable
          ProductCategoryRow
          ProductRow
*/

/*****
    Step 2: Build A Static Version in React
*****/
// class ProductCategoryRow extends React.Component {
//     render() {
//         const category = this.props.category;
//         return ( 
//             <tr>
//                 <th colSpan="2">
//                     {category}
//                 </th>
//             </tr>
//         );
//     }
// }

// class ProductRow extends React.Component {
//     render() {
//         const product = this.props.product;
//         const name = product.stocked ? 
//             product.name : 
//             <span style={{color: 'red'}}>
//                 {product.name}
//             </span>;

//         return (
//             <tr>
//                 <td>{name}</td>
//                 <td>{product.price}</td>
//             </tr>
//         );
//     }
// }

// class ProductTable extends React.Component {
//     render() {
//         const rows = [];
//         let lastCategory = null;

//         this.props.products.forEach((product) => {
//             if(product.category !== lastCategory) {
//                 rows.push(
//                     <ProductCategoryRow 
//                         category={product.category}
//                         key={product.category}
//                     />
//                 );
//             }
//             rows.push(
//                 <ProductRow 
//                     product={product}
//                     key={product.name} />
//             );
//             lastCategory = product.category;
//         });

//         return (
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>{rows}</tbody>
//             </table>
//         );
//     }
// }

// class SearchBar extends React.Component {
//     render() {
//         return (
//             <form>
//                 <input type="text" placeholder="Search..." />
//                 <p>
//                     <input type="checkbox" />
//                     {' '}
//                     Only show products in stock
//                 </p>
//             </form>
//         );
//     }
// }

// class FilteredProductTable extends React.Component {
//     render() {
//         return (
//             <div>
//                 <SearchBar />
//                 <ProductTable products={this.props.products} />
//             </div>
//         );
//     }
// }

// const PRODUCTS = [
//     { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
//     { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
//     { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
//     { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
//     { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
//     { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' }
// ];

// ReactDOM.render(
//     <FilteredProductTable products={PRODUCTS} />,
//     document.getElementById('container')
// );

/*****
    Step 3: Identify The Minimal(but complete) Representation Of UI State
*****/
/*
    To build your app correctly, you first need to think of the minimal set of mutable state that your app needs.The key here is DRY: Don’ t Repeat Yourself.Figure out the absolute minimal representation of the state your application needs and compute everything
    else you need on - demand.For example, if you’ re building a TODO list, keep an array of the TODO items around; don’ t keep a separate state variable for the count.Instead, when you want to render the TODO count, take the length of the TODO items array.

    Let’ s go through each one and figure out which one is state.Ask three questions about each piece of data:

        1. Is it passed in from a parent via props ? If so, it probably isn’ t state.
        2. Does it remain unchanged over time ? If so, it probably isn’ t state.
        3. Can you compute it based on any other state or props in your component ? If so, it isn’ t state.

    The original list of products is passed in as props, so that’ s not state.The search text and the checkbox seem to be state since they change over time and can’ t be computed from anything.And finally, the filtered list of products isn’ t state because it can be computed by combining the original list of products with the search text and value of the checkbox.

    So finally, our state is:

        - The search text the user has entered
        - The value of the checkbox
*/

/*****
    Step 4: Identify Where Your State Should Live
*****/
/* 
    For each piece of state in your application:

        - Identify every component that renders something based on that state.
        - Find a common owner component(a single component above all the components that need the state in the hierarchy).
        - Either the common owner or another component higher up in the hierarchy should own the state.
        - If you can’ t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.
    
    Let’ s run through this strategy for our application:

    - ProductTable needs to filter the product list based on state and - SearchBar needs to display the search text and checked state. The common owner component is FilterableProductTable.
    - It conceptually makes sense for the filter text and checked value to live in FilterableProductTable
*/
// class ProductCategoryRow extends React.Component {
//     render() {
//         const category = this.props.category;
//         return ( 
//             <tr>
//                 <th colSpan = "2"> 
//                     { category } 
//                 </th> 
//             </tr>
//         );
//     }
// }

// class ProductRow extends React.Component {
//     render() {
//         const product = this.props.product;
//         const name = product.stocked ?
//             product.name :
//             <span style = {{color: 'red' }}> 
//                 {product.name} 
//             </span>;

//         return ( 
//             <tr>
//                 <td>{name}</td> 
//                 <td>{product.price} </td> 
//             </tr>
//         );
//     }
// }

// class ProductTable extends React.Component {
//     render() {
//         const filterText = this.props.filterText;
//         const inStockOnly = this.props.inStockOnly;

//         const rows = [];
//         let lastCategory = null;

//         this.props.products.forEach((product) => {
//             if(product.name.indexOf(filterText) === -1){
//                 return;
//             }
//             if(inStockOnly && !product.stocked) {
//                 return;
//             }
//             if (product.category !== lastCategory) {
//                 rows.push( 
//                     <ProductCategoryRow 
//                         category={product.category}
//                         key={product.category}
//                     />
//                 );
//             }
//             rows.push( 
//                 <ProductRow 
//                     product={product}
//                     key={product.name}
//                 />
//             );
//             lastCategory = product.category;
//         });

//         return ( 
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th> 
//                         <th>Price</th>
//                     </tr> 
//                 </thead> 
//                 <tbody>{rows}</tbody> 
//             </table>
//         );
//     }
// }

// class SearchBar extends React.Component {
//     render() {
//         const filterText = this.props.filterText;
//         const inStockOnly = this.props.inStockOnly;

//         return ( 
//             <form>
//                 <input 
//                     type="text"
//                     placeholder="Search..." 
//                     value={filterText} />
//                 <p>
//                 <input 
//                     type="checkbox" 
//                     checked={inStockOnly} /> 
//                 {' '}
//                 Only show products in stock 
//                 </p> 
//             </form>
//         );
//     }
// }

// class FilteredProductTable extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             filterText: '',
//             inStockOnly: false
//         }
//     }

//     render() {
//         return ( 
//             <div>
//                 <SearchBar 
//                     filterText={this.state.filterText}
//                     inStockOnly={this.state.inStockOnly}
//                 />
//                 <ProductTable 
//                     products={this.props.products}
//                     filterText={this.state.filterText}
//                     inStockOnly = {this.state.inStockOnly} /> 
//             </div>
//         );
//     }
// }

// const PRODUCTS = [{
//         category: 'Sporting Goods',
//         price: '$49.99',
//         stocked: true,
//         name: 'Football'
//     },
//     {
//         category: 'Sporting Goods',
//         price: '$9.99',
//         stocked: true,
//         name: 'Baseball'
//     },
//     {
//         category: 'Sporting Goods',
//         price: '$29.99',
//         stocked: false,
//         name: 'Basketball'
//     },
//     {
//         category: 'Electronics',
//         price: '$99.99',
//         stocked: true,
//         name: 'iPod Touch'
//     },
//     {
//         category: 'Electronics',
//         price: '$399.99',
//         stocked: false,
//         name: 'iPhone 5'
//     },
//     {
//         category: 'Electronics',
//         price: '$199.99',
//         stocked: true,
//         name: 'Nexus 7'
//     }
// ];

// ReactDOM.render( 
//     <FilteredProductTable products={PRODUCTS} />,
//     document.getElementById('container')
// );

/*****
    Step 5: Add Inverse Data Flow
*****/
/*
    If you try to type or check the box in the current version of the example, you’ ll see that React ignores your input.This is intentional, as we’ ve set the value prop of the input to always be equal to the state passed in from FilterableProductTable.

    Let’ s think about what we want to happen.We want to make sure that whenever the user changes the form, we update the state to reflect the user input.Since components should only update their own state, FilterableProductTable will pass callbacks to SearchBar that will fire whenever the state should be updated.We can use the onChange event on the inputs to be notified of it.The callbacks passed by FilterableProductTable will call setState(), and the app will be updated.
*/
class ProductCategoryRow extends React.Component {
    render() {
        const category = this.props.category;
        return ( 
            <tr>
                <th colSpan = "2"> 
                    { category } 
                </th> 
            </tr>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        const name = product.stocked ?
            product.name :
            <span style = {{color: 'red' }}> 
                {product.name} 
            </span>;

        return ( 
            <tr>
                <td>{name}</td> 
                <td>{product.price} </td> 
            </tr>
        );
    }
}

class ProductTable extends React.Component {
    render() {
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;

        const rows = [];
        let lastCategory = null;

        this.props.products.forEach((product) => {
            if(product.name.indexOf(filterText) === -1){
                return;
            }
            if(inStockOnly && !product.stocked) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push( 
                    <ProductCategoryRow 
                        category={product.category}
                        key={product.category}
                    />
                );
            }
            rows.push( 
                <ProductRow 
                    product={product}
                    key={product.name}
                />
            );
            lastCategory = product.category;
        });

        return ( 
            <table>
                <thead>
                    <tr>
                        <th>Name</th> 
                        <th>Price</th>
                    </tr> 
                </thead> 
                <tbody>{rows}</tbody> 
            </table>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return ( 
            <form>
                <input 
                    type="text"
                    placeholder="Search..." 
                    value={this.props.filterText} 
                    onChange={this.handleFilterTextChange} />
                <p>
                <input 
                    type="checkbox" 
                    checked={this.props.inStockOnly} 
                    onChange={this.handleInStockChange} /> 
                {' '}
                Only show products in stock 
                </p> 
            </form>
        );
    }
}

class FilteredProductTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockChange(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        });
    }

    render() {
        return ( 
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                />
                <ProductTable 
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly = {this.state.inStockOnly} /> 
            </div>
        );
    }
}

const PRODUCTS = [{
        category: 'Sporting Goods',
        price: '$49.99',
        stocked: true,
        name: 'Football'
    },
    {
        category: 'Sporting Goods',
        price: '$9.99',
        stocked: true,
        name: 'Baseball'
    },
    {
        category: 'Sporting Goods',
        price: '$29.99',
        stocked: false,
        name: 'Basketball'
    },
    {
        category: 'Electronics',
        price: '$99.99',
        stocked: true,
        name: 'iPod Touch'
    },
    {
        category: 'Electronics',
        price: '$399.99',
        stocked: false,
        name: 'iPhone 5'
    },
    {
        category: 'Electronics',
        price: '$199.99',
        stocked: true,
        name: 'Nexus 7'
    }
];

ReactDOM.render( 
    <FilteredProductTable products={PRODUCTS} />,
    document.getElementById('container')
);
