import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'; // MobX 에서 사용하는 Provider
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Store from './stores';

const root = new Store();
ReactDOM.render(
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Provider {...root}>
        {/* Provider 에 props 로 넣어줍니다. */}
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
