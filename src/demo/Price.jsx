import React from 'react';


class Price extends React.Component {
    constructor(props){
        super(props);

        this.state= {
            price: props.text,
            rate: props.rate,
        }
    }
    handleClick = () => {
        let {price, rate} = this.state;
        let sign = price.[price.length-1];
        if (sign === "$") {
            let amd = parseFloat(price) * rate + "d";
            this.setState({
                price: amd,
            });
        } else if (sign === "d") {
            let usd = parseFloat(price) / rate + "$";
            this.setState ({
                price: usd 
            });
        }
    };
    render() {
        return (
            <>
            <p className="padding">
                Price: {this.state.price}
            </p>
            <button
            onClick= {this.handleClick}
            >
                Change the currency
            </button>
            </>
        );
    }
}



export default Price;