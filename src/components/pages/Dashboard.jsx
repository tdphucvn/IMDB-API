import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Trending from './Trending';
import Discover from './Discover';
import Search from './Search';
import Movie from './Movie';
import MovieHeader from '../utils/MovieHeader';
import GeneralHeader from '../utils/GeneralHeader';

const Dashboard = () => {
    return (
        <Router>
            <>
                <Switch>
                    <Route exact path="/movie/:id" component={MovieHeader}/>
                    <Route component={GeneralHeader}/>
                </Switch>
                <Switch>
                    <Route exact path="/" component={Trending}/>
                    <Route exact path="/discover" component={Discover}/>
                    <Route exact path="/search" component={Search}/>
                    <Route exact path="/movie/:id" component={Movie}/>
                </Switch>
            </>
        </Router>
    )
}

export default Dashboard
