import React from 'react';
import { useParams } from "react-router";

export default class App {

    constructor(props) {
      super(props);

      this.state = {
        data : null
      };
    }

    componentWillMount() {
        this.renderMyData();
    }

    renderMyData(){
        fetch('https://your url')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({ data : responseJson })
            })
            .catch((error) => {
              console.error(error);
            });
    }

    render(){
        return(
            <View>
                {this.state.data ? <MyComponent data={this.state.data} /> : <MyLoadingComponnents /> }
            </View>
        );
    }
}