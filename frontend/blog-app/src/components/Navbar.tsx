import React from 'react'

const Navbar = () => {
  return (
    <div className='shadow py-5 sticky top-0 text-purple-600 bg-slate-300'>
      <nav className='flex justify-between mx-20 h-8 items-center '>
          <div><h1 className='font-extrabold text-3xl'> Blog it!</h1></div>
          <div className='uppercase font-semibold'>
            <ul className='flex gap-10 '>
              <li className='cursor-pointer'>All</li>
              <li className='cursor-pointer'>Science</li>
              <li className='cursor-pointer'>Wildlife</li>
              <li className='cursor-pointer'>World</li>
              <li className='cursor-pointer'>Climate</li>
            </ul>
          </div>
          <div className='flex gap-5 font-semibold'>
            <button className='bg-gradient-to-r from-indigo-400 from-15% via-pink-1000 to-purple-600
            py-3 px-5 text-white rounded-xl text-lg shadow-md shadow-purple' >Login</button>
            <button className='bg-gradient-to-r from-indigo-400 from-15% via-pink-1000 to-purple-600
            py-3 px-5 text-white rounded-xl '>Register</button>
          </div>
      </nav>
    </div>
  )
}

export default Navbar
