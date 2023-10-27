import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CategoryType, selectCategoryFilter, setCategoryFilter } from '../features/blogs/BloggerSlice';
import { fetchCategories, selectAllCategories } from '../features/blogs/CategorySlice';

const Navbar = () => {
  const dispatch = useDispatch();
  
  const categoryFilter = useSelector(selectCategoryFilter);
  console.log(`category filter = ${categoryFilter}`);
  const categories: CategoryType[] = useSelector(selectAllCategories);
  console.log(`Categories are = ${categories}`);

  useEffect(() => {
    dispatch(fetchCategories() as any); // fetching data when the component mounts.
  }, []);

  // const categoryClick = ((category) => {
  //   if(category === 'all') {
  //     dispatch(setCategoryFilter(null));
  //   }
  //   else {
  //     dispatch(setCategoryFilter(category));
  //   }
  // })
  {categories && categories.map((category) => 
    console.log(category.name)
  )}
  
  return (
    <div className='shadow py-5 sticky top-0 text-purple-600 bg-slate-300'>
      <nav className='flex justify-between mx-20 h-8 items-center '>
          <div>
            <Link to='/'>
              <h1 className='font-extrabold text-3xl'> Blog it!</h1>
            </Link>
          </div>
          <div className='uppercase font-semibold'>
            <ul className='flex gap-10 '>
              <li className='cursor-pointer'>All</li>
              {categories.map((category) => 
                (<li className='cursor-pointer'>{category.name} </li>)
              )}
            </ul>
          </div>
          <div className='flex gap-5 font-semibold'>
            <Link to='/login'>
              <button className='bg-gradient-to-r from-indigo-400 from-15% via-pink-1000 to-purple-600
              py-3 px-5 text-white rounded-xl text-lg shadow-md shadow-purple' >
                Login
              </button>
            </Link>
            <Link to='/register'>
              <button className='bg-gradient-to-r from-indigo-400 from-15% via-pink-1000 to-purple-600
              py-3 px-5 text-white rounded-xl '>
                Register
              </button>
            </Link>
          </div>
      </nav>
    </div>
  )
}

export default Navbar
