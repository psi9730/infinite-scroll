import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedView from './pages/feedView';
import './styles/main.scss';

const theme = createMuiTheme({
    palette: {
        type: 'light'
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div className="root-container">
                    <Router>
                        <div className="main-content">
                            <Switch>
                                <Route component={FeedView} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
