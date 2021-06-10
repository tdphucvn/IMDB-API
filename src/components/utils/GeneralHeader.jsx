import {React, useState} from 'react'
import { Typography, AppBar, Toolbar, IconButton, makeStyles, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import Link  from '@material-ui/core/Link';
import Navigation from './Navigation';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(1),
    },
    link: {
        hover: {
            cursor: 'pointer',
        },
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={showMenu} className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4">
                    <Link component={RouterLink} to='/path/to/section'>Link</Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            {menu === true ? <Navigation menu={[menu, setMenu]}/> : ''}
        </>
    )
}

export default GeneralHeader
