import React from 'react'

import './App.scss'

import Header from './Header'

const App = () => {
    return (
        <div className="awm-app-main">
            <Header />
            <div className="awm-app-content">Content</div>
            <div>Footer</div>
        </div>
    )
}

export default App