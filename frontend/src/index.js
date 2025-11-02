/*
Name: Mthokozisi Duba
Student number: u24690059
Position: 51
*/

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css'; // Import Tailwind CSS

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App/>);
