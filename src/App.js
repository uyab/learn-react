import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {

        // It doesn't work
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then(res => this.setState({'posts': res.json()}))

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => this.setState({'posts': json}))

    }

    render() {
        return (
            <div className="App">
                <Table data={ this.state.posts }/>
            </div>
        );
    }
}

function Table(props) {
    return (
        <table className="table">
            <caption>Jumlah posts: {props.data.length}</caption>
            <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
            </tr>
            </thead>
            <tbody>
            {(props.data.length > 0) ? props.data.map((post, index) => {
                return (
                    <tr key={index}>
                        <td>{post.id}</td>
                        <td>{post.title}</td>
                        <td>{post.body}</td>
                    </tr>
                )
            }) : <tr>
                <td colSpan="3">Loading...</td>
            </tr>}
            </tbody>
        </table>
    );
}

export default App;
