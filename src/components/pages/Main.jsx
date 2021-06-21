import {React} from 'react';
import Landing from '../utils/Landing';
import GeneralHeader from '../utils/GeneralHeader';
import Discover from './Discover';
import Search from './Search';

const Main = () => {

    return (
        <>
          <GeneralHeader />
          <Landing />
          <Discover />
          <Search />
        </>
    )
};

export default Main
