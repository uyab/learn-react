import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <Table data="test" />
    </div>
  );
}

function Table(props) {
    return (
        <table>
            <thead>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>
    );
}

export default App;
