import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <footer className="bg-dark text-white mt-5 p-4 text-center">
                Created By Gia Long &reg; {new Date().getFullYear()} Dev Connector - Base on Tutorial
            </footer>
        );
    }
}

export default Footer;