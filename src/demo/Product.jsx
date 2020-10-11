import React from 'react';
import Name from './Name';
import Description from './Description';
import Price from './Price';

class Product extends React.Component {
    render() {
        return (
            <div>
                <Name text={this.props.name} />
                <Price text={this.props.price} />
                <Description text={this.props.description} />
            </div>

        );
    }
}



export default Product;