import {React} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Movie from './components/Movie';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/:id" component={Movie} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
