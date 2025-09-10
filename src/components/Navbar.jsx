import React from 'react'

const Navbar = () => {
    return (
        <nav className='w-screen flex justify-between border bg-indigo-600  p-4'>
            <div className="logo">
                <span className='font-bold text-white text-2xl'>iTask</span>
            </div>
                <ul className='flex gap-4 md:gap-10 text-white text-xl mx-2 md:mx-9'>
                    <li className='cursor-pointer hover:font-extrabold'>Home</li>
                    <li className='cursor-pointer hover:font-extrabold'>Your Todos</li>
                </ul>
        </nav>
    )
}

export default Navbar
