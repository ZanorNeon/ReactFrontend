import { Link } from 'react-router-dom';

import classes from '../components-css/Header.module.css';

function Header() {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                React Poster
            </h1>
            <p>
                <Link to="/create-post" className={classes.button} >
                    New Post
                </Link>
            </p>
        </header>
    );
}

export default Header;