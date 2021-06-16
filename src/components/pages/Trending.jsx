import {React, useState, useEffect} from 'react';
import Movies from '../utils/Movies';
import Landing from '../utils/Landing';
import GeneralHeader from '../utils/GeneralHeader';

const Dashboard = (prevSearch) => {

    return (
        <>
          <GeneralHeader />
          <Landing />
        </>
    )
};

export default Dashboard
