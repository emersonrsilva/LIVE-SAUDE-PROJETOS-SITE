import React, {Component} from 'react';
import Routes from './Routes';

//css
import './Styles/bootstrap/bootstrap.scss'
import './Styles/bootstrap/bootstrap-reboot.scss'
import './Styles/bootstrap/bootstrap-grid.scss'
import './Styles/App.scss'
import './Styles/main-responsive.scss'


import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
  } from "react-device-detect";


export default class App extends Component {
    render() {
        return (
            <Routes />
        );
    }
}