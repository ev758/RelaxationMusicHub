import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import RelaxationMusicHub from './components/RelaxationMusicHub.js';
import MusicSearchResults from './components/MusicSearchResults.js';
import Page404 from './components/404.js';
import RelaxationMusicError from './components/RelaxationMusicError.js';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>} errorElement={<RelaxationMusicError/>}>
            <Route index element={<RelaxationMusicHub/>}/>
            <Route path="musicsearchresults/:keyword" element={<MusicSearchResults/>}/>
            <Route path="*" element={<Page404/>}/>
        </Route>
    )
);

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <RouterProvider router={router}/>
);
