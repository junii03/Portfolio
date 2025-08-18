import React from 'react'
import Navbar from './sections/Navbar'

const App = () => {
    return (
        <div className='relative w-screen min-h-screen overflow-x-auto'>
            <Navbar></Navbar>
            <section id='home' className='min-h-screen bg-DarkLava'></section>
            <section id='services' className='min-h-screen bg-amber-50'></section>
        </div>
    )
}

export default App
