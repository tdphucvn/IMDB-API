import {React} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './Main';
import Search from './Search';
import Actor from '../utils/actor/Actor';
import Movie from './Movie';

const Dashboard = () => {

    return (
        <Router>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/person/:id" component={Actor}/>
                    <Route exact path="/movie/:id" component={Movie}/>
                </Switch>
        </Router>
    )
}

export default Dashboard
