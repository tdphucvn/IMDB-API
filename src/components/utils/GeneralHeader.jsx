import {React, useState} from 'react'
import { Typography, AppBar, Toolbar, IconButton, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
    },
    flexGrow: {
        flexGrow: 1
    },
    linksContainer: {
        width: '20%',
        display: 'flex',
        justifyContent: 'space-around'
    }
}));

const GeneralHeader = () => {
    const [menu, setMenu] = useState(false);

    const showMenu = () => {
        if(menu) {setMenu(false); return;}
        setMenu(true);
    };

    const classes = useStyles();

    return (
        <>
            <AppBar position="static" color="transparent" style={{borderBottom: '1px solid #292f48'}}>
                <Toolbar className={classes.navBar}>
                    <Typography variant="h4" style={{color: 'white'}}>AMDT</Typography>
                    <div className={classes.flexGrow}></div>
                    <div className={classes.linksContainer}>
                        <Link href="#" underline="none" style={{color: 'white'}}><Typography>Trending</Typography></Link>
                        <Link href="#discover-container" underline="none" style={{color: 'white'}}><Typography>Discover</Typography></Link>
                        <Link component={RouterLink} to="/search" underline="none" style={{color: 'white'}}><Typography>Search</Typography></Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div id="back-to-top-anchor" className={classes.bottomGutter}></div>
            {menu === true ? <Navigation menu={[menu, setMenu]}/> : ''}
        </>
    )
}

export default GeneralHeader
