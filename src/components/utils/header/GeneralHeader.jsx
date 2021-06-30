import {React} from 'react'
import { Typography, AppBar, Toolbar,  makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link  from '@material-ui/core/Link';
import logo from '../../../images/logo.png';

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
        width: '25%',
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

const GeneralHeader = () => {
    const classes = useStyles();

    return (
        <>
            <AppBar position="static" style={{backgroundColor: '#0d253f'}}>
                <Toolbar className={classes.navBar}>
                    <RouterLink to="/">
                        <img src={logo} alt="" style={{height: 64, margin: '10px 0'}}/>
                    </RouterLink>
                    <div className={classes.flexGrow}></div>
                    <div className={classes.linksContainer}>
                        <Link component={RouterLink} to="/search" underline="none"><Typography style={{color: 'white'}} variant="h6">Search</Typography></Link>
                        <Link href="#discover-container" underline="none"><Typography style={{color: 'white'}} variant="h6">Discover</Typography></Link>
                        <Link href="#actors" underline="none"><Typography style={{color: 'white'}} variant="h6">Actors</Typography></Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div id="back-to-top-anchor" className={classes.bottomGutter}></div>
        </>
    )
}

export default GeneralHeader
