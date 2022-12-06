import React from 'react';
import { createRoot } from 'react-dom/client';
import { MyApplication } from './components/MyApplication.jsx';
import './main.scss';

const container = document.getElementById('container');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<MyApplication />);