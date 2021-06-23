import {React} from 'react';
import Landing from '../utils/Landing';
import GeneralHeader from '../utils/GeneralHeader';
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
