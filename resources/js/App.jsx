import React from 'react';
import { createRoot } from 'react-dom/client'
import './bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import TodoApp from "@components/TodoApp.jsx";


if(document.getElementById('app')){
    createRoot(document.getElementById('app')).render(<TodoApp />)
}