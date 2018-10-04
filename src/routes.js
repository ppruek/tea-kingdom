import React from 'react';
import {Router, Route } from 'react-router';
import xx from './components/UseCasePage';
import productTable from './components/productTable';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import Homepage from './components/Home'

const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Homepage}/>
        <Route path="/product" component={productTable}/>
        <Route path="/AboutUs" component={AboutUs}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>  
        <Route path="/ProductDetail" component={ProductDetail}/>
    </Router>
);


export default Routes;