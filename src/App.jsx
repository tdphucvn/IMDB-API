import {React, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getGenres } from './redux/GenresSlice';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch]);

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
