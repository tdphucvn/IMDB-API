import {React} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './Main';
import Search from './Search';
import Test from '../utils/Test';
import SearchPeople from '../utils/SearchPeople';

const Dashboard = () => {

    return (
        <Router>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/person/:id" component={SearchPeople}/>
                    <Route exact path="/test" component={Test} />
                </Switch>
        </Router>
    )
}

export default Dashboard
