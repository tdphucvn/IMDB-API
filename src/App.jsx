import {React, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { getGenres } from './redux/GenresSlice';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import ScrollToTop from './ScrollToTop';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch]);

  return (
    <Router>
        <ScrollToTop />
        <Switch>
          <Route path="/" component={Dashboard} />
        </Switch>
    </Router>
  ) 
}

export default App
