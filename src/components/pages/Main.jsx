import {React, useState, useEffect} from 'react';
import Movies from '../utils/Movies';
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