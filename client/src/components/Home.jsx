import React from 'react';

function Home() {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Capture Your Thoughts, Anytime, Anywhere</h1><br></br>
            <h4 style={styles.subheading}>Please Login/Register to Continue</h4>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        textAlign: 'center',
    },
    heading: {
        margin: '0',
        fontStyle:"italic"
    },
    subheading: {
        margin: '0',
    },
};

export default Home;
