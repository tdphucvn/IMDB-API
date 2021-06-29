import {React} from 'react';
import Landing from '../utils/land/Landing';
import GeneralHeader from '../utils/header/GeneralHeader';
import Discover from './Discover';
import Actors from './Actors';

const Main = () => {

    return (
        <>
          <GeneralHeader />
          <Landing />
          <Discover />
          <Actors />
        </>
    )
};

export default Main
