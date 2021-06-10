import {React} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Movie from './components/pages/Movie';
import Dashboard from './components/pages/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  ) 
}

export default App
