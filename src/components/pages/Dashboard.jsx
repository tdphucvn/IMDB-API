import {React} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './Main';
import Discover from './Discover';
import Search from './Search';
import Movie from './Movie';
import Test from '../utils/Test';

const Dashboard = () => {

    return (
        <Router>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/discover" component={Discover}/>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/movie/:id" component={Movie}/>
                    <Route exact path="/test" component={Test} />
                </Switch>
        </Router>
    )
}

export default Dashboard
