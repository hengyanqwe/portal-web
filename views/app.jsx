import React from 'react';
import ReactDOM from 'react-dom';
import 'core-js';
import Page from './page/index';
import './global';
import {createRoot} from "react-dom/client";

const container=document.getElementById('root');
const root=createRoot(container);
root.render(<Page/>)

