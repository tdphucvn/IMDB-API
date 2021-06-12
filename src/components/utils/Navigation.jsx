import { React} from 'react'
import { Drawer, List, ListItemText, makeStyles } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import ListItem  from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
    navList: {
        maxWidth: 300,
        width: '25vw',
        minWidth: 170,
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
        <div className={classes.navList} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                {[["Trending", "/"], ["Discover", "/discover"], ["Search", "/search"]].map((item, index) => (
                    <ListItem button key={item[0]} component={RouterLink} to={item[1]}>
                        <ListItemText primary={item[0]} />
                    </ListItem>
                ))}
            </List>
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
