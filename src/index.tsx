import React from 'react';
import { render } from 'react-dom';

import App from './App';

import './styles/index.module.scss';

const container = document.getElementById('app');
render(<App />, container);