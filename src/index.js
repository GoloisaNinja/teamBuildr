import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import AppRouter from '../src/Routers/AppRouter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);
