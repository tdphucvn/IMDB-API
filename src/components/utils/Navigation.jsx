import React from 'react'
import { Drawer, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    navList: {
        maxWidth: 300,
        width: '25vw',
    },
}));

const Navigation = ({menu}) => {

    const classes = useStyles();

    const [drawer, setDrawer] = menu;

    const toggleDrawer = (action) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawer(action);
    };

    const navList = () => (
        <div className={classes.navList} nClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            {["Trending", "Discover", "Search"].map((text, index) => (
                <List>
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                </List>
            ))}
        </div>
    );

    return (
        <>
            <Drawer anchor="left" open={drawer} onClose={toggleDrawer(false)}>
                {navList()}
            </Drawer>
        </>
    )
}

export default Navigation
