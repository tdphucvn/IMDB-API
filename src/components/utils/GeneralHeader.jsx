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
        marginBottom: theme.spacing(4),
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
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton onClick={showMenu} className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4">
                    <Link className={classes.link} component={RouterLink} to='/' color="inherit" underline="none">AMDT</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" className={classes.bottomGutter} />
            {menu === true ? <Navigation menu={[menu, setMenu]}/> : ''}
        </>
    )
}

export default GeneralHeader
