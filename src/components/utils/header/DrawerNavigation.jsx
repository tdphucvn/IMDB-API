import React from 'react';
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
    drawer: {
        width: '50vw'
    },
}));

const DrawerNavigation = ({drawerState, general}) => {
    const classes = useStyles();
    const [drawer, setDrawer] = drawerState;

    const toggleDrawer = (open) => ( event ) => {
        if (
            event.type === 'keydown' &&
            ((event).key === 'Tab' ||
            (event).key === 'Shift')
        ) return;

        setDrawer(open);
    };

    const list = () => (
        <div role="presentation" onKeyDown={toggleDrawer(false)} onClick={toggleDrawer(false)} className={classes.drawer}>
            { general ? 
                <List>
                    <ListItem button component="a" href="#discover-container">
                        <ListItemText primary='DISCOVER'/>
                    </ListItem>
                    <ListItem button component="a" href="#actors">
                        <ListItemText primary='ACTRORS'/>
                    </ListItem>
                    <ListItem button component={RouterLink} to={'/search'}>
                        <ListItemText primary='SEARCH'/>
                    </ListItem>
                </List>
            : 
                <List>
                    <ListItem button component={RouterLink} to="/">
                        <ListItemText primary='HOME'/>
                    </ListItem>
                    <ListItem button component={RouterLink} to={'/search'}>
                        <ListItemText primary='SEARCH'/>
                    </ListItem>
                </List>
            }
        </div>
    )

    return (
        <div>
            <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    )
};

export default DrawerNavigation;
