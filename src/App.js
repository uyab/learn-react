import React, {Component} from 'react';
import './App.css';

const URL = 'https://jsonplaceholder.typicode.com/posts'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            searchboxText: '',
            searchboxTextServerSide: '',
        }

        this.handleSearchingClientSide = this.handleSearchingClientSide.bind(this);
        this.handleSearchingServerSide = this.handleSearchingServerSide.bind(this);
    }

    handleSearchingClientSide(text) {
        this.setState({searchboxText: text})
    }

    handleSearchingServerSide(text) {
        this.setState({searchboxTextServerSide: text})

        let endpoint = URL;
        if (text) {
            endpoint += '?userId=' + text
        }

        fetch(endpoint)
            .then(res => res.json())
            .then(json => this.setState({'posts': json}))

    }

    componentDidMount() {

        // It doesn't work
        // fetch('https://jsonplaceholder.typicode.com/posts')
        //     .then(res => this.setState({'posts': res.json()}))

        fetch(URL)
            .then(res => res.json())
            .then(json => this.setState({'posts': json}))

    }

    render() {
        return (
            <div className="App">
                <Table data={this.state.posts}
                       onSearchingClientSide={this.handleSearchingClientSide}
                       onSearchingServerSide={this.handleSearchingServerSide}
                       searchboxText={this.state.searchboxText}
                       searchboxTextServerSide={this.state.searchboxTextServerSide}/>
            </div>
        );
    }
}

class Table extends Component {

    constructor(props) {
        super(props);
        this.handleSearchClientSide = this.handleSearchClientSide.bind(this);
        this.handleSearchServerSide = this.handleSearchServerSide.bind(this);
    }

    handleSearchClientSide(e) {
        this.props.onSearchingClientSide(e.target.value);
    }

    handleSearchServerSide(e) {
        this.props.onSearchingServerSide(e.target.value);
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
                                   name="search" placeholder="Client side searching, filter by Title..."/>

                            <input type="text"
                                   value={this.props.searchboxTextServerSide}
                                   onChange={this.handleSearchServerSide}
                                   placeholder="Server side searching, filter by user ID..."/>
                        </form>
                    </th>
                </tr>
                <tr>
                    <th>Id</th>
                    <th>User Id</th>
                    <th>Title</th>
                    <th>Body</th>
                </tr>
                </thead>
                <tbody>
                {(filteredPosts.length > 0) ? filteredPosts.map((post, index) => {
                    return (
                        <tr key={index}>
                            <td>{post.id}</td>
                            <td>{post.userId}</td>
                            <td>{post.title}</td>
                            <td>{post.body}</td>
                        </tr>
                    )
                }) : <tr>
                    <td colSpan="3">{this.props.searchboxText || this.props.searchboxTextServerSide ? 'Empty result' : 'Loading'}</td>
                </tr>}
                </tbody>
            </table>
        );
    }
}

export default App;
