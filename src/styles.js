import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f8f7'
    },

    main: {
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        backgroundColor: '#f0f8f7'
    },

    button_primary: {
        backgroundColor: '#127a75',
        color: '#ffffff'
    },

    button_secondary: {
        backgroundColor: '#e3ebe9',
        borderColor: '#127a75',
        color: '#127a75'
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

    logo: {
        height: 50,
    },

    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        margin: 10,
    },

    title: {
        marginTop: 18,
        marginLeft: 10,
        fontWeight: 550,
    },

    space: {
        padding: 10,
    },

    media: {
        width: 200,
    },

    margin_bottom: {
        marginBottom: 20,
    },

    largeButton: {
        width: 250,
    },

    largeInput: {
        width: '60px!important',
        padding: '0!important',
        fontSize: '30px!important',
        textAlign: 'center!important',
    },

    bordered: {
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        borderStyle: 'dotted',
        borderColor: '#b7d4d4',
    },

    row : {
        display: 'flex',
        padding: 10,
    },

    around: {
        justifyContent: 'space-around',
    },

    between: {
        justifyContent: 'space-between',
    },

    column: {
        flexDirection: 'column',
    },

}));

// yellow: eccb6c, green: 6e6b2e, red: d02f29, orange: df782e, orange_text: da5e2b