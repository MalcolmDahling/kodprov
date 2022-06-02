import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <Helmet>
                <title>Kruso - Kodprov</title>
                <meta name="description" content="Kodprov från Kruso"/>
                <meta property="og:title" content="Kruso - Kodprov"/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content="https://malcolmdahling.github.io/kruso-kodprov/"/>
            </Helmet>

            <App />
        </HelmetProvider>
        
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
