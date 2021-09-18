import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },

    green: {
        backgroundColor: '#6e6b2e',
    },

    orange: {
        backgroundColor: '#df782e',
    },

    yellow: {
        backgroundColor: '#eccb6c',
    },

    red: {
        backgroundColor: '#d02f29',
        color: '#ffffff',
    },

    main: {
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        color: '#6e6b2e',
        borderColor: '#eccb6c'
    },

    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    largeLogo: {
        height: 100,
    },

    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        margin: 10,
    },

    space: {
        padding: 10,
    },

    media: {
        width: 200,
    },

    margin_bottom: {
        marginBottom: 20,
    }

}));

// yellow: eccb6c, green: 6e6b2e, red: d02f29, orange: df782e, orange_text: da5e2b