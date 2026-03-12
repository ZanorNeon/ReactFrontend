import classes from './Header.module.css';

function Header({onCreatePost}) {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                ToDo List maker
            </h1>
            <p>
                <button
                    className={classes.button}
                    onClick={onCreatePost}
                >
                    New Post
                </button>
            </p>
        </header>
    );
}

export default Header;