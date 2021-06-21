import {React} from 'react';
import Landing from '../utils/Landing';
import GeneralHeader from '../utils/GeneralHeader';
import Discover from './Discover';

const Main = () => {

    return (
        <>
          <GeneralHeader />
          <Landing />
          <Discover />
        </>
    )
};

export default Main
