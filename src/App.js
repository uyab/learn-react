import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            searchboxText: ''
        }

        this.handleSearchingClientSide = this.handleSearchingClientSide.bind(this);
    }

    handleSearchingClientSide(text) {
        this.setState({searchboxText: text})
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
                <Table data={ this.state.posts }
                       onSearchingClientSide={this.handleSearchingClientSide}
                       searchboxText={ this.state.searchboxText }/>
            </div>
        );
    }
}

class Table extends Component{

    constructor(props) {
        super(props);
        this.handleSearchClientSide = this.handleSearchClientSide.bind(this);
    }

    handleSearchClientSide(e) {
        this.props.onSearchingClientSide(e.target.value);
    }

    render() {
        const filteredPosts = this.props.data.filter(post => post.title.indexOf(this.props.searchboxText) > -1)

        return (
            <table className="table">
                <caption>Jumlah posts: {filteredPosts.length}</caption>
                <thead>
                <tr>
                    <th colSpan="3">
                        <form>
                            <input value={this.props.searchboxText}
                                   onChange={this.handleSearchClientSide}
                                   type="text"
                                   name="search" placeholder="Client side searching..."/>
                            <input type="text" placeholder="Server side searching..."/>
                        </form>
                    </th>
                </tr>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {(filteredPosts.length > 0) ? filteredPosts.map((post, index) => {
                    return (
                        <tr key={index}>
                            <td>{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    )
                }) : <tr>
                    <td colSpan="3">{this.props.searchboxText ? 'Empty result' : 'Loading'}</td>
                </tr>}
                </tbody>
            </table>
        );
    }
}

export default App;
