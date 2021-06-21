import {React, useState} from 'react'
import { Typography, AppBar, Toolbar,  makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link  from '@material-ui/core/Link';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
    },
    bottomGutter : {
        marginBottom: theme.spacing(0),
        height: 0
    },
    navBar: {
        display: 'flex',
        width: '90%',
        margin: 'auto'
    },
    flexGrow: {
        flexGrow: 1
    },
    linksContainer: {
        width: '20%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const GeneralHeader = () => {
    const [menu, setMenu] = useState(false);

    const classes = useStyles();

    return (
        <>
            <AppBar position="static" color="transparent" style={{borderBottom: '1px solid #292f48'}}>
                <Toolbar className={classes.navBar}>
                        <Link href="/" underline="none"><Typography variant="h4" style={{color: 'white'}}>AMDT</Typography></Link>
                    <div className={classes.flexGrow}></div>
                    <div className={classes.linksContainer}>
                        <Link component={RouterLink} to="/search" underline="none" style={{color: 'white'}}><Typography>Search</Typography></Link>
                        <Link href="#discover-container" underline="none" style={{color: 'white'}}><Typography>Discover</Typography></Link>
                        <Link href="#latest-news" underline="none" style={{color: 'white'}}><Typography>News</Typography></Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div id="back-to-top-anchor" className={classes.bottomGutter}></div>
            {menu === true ? <Navigation menu={[menu, setMenu]}/> : ''}
        </>
    )
}

export default GeneralHeader
