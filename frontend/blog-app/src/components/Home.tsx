import React, { useEffect } from 'react';
import SidePanel from './SidePanel';

import Data from '../features/blogs/Data';

const Home = () => {
  return (
    <div className='container m-auto mt-5'>
      <div className='grid grid-cols-3 gap-4'>
        <div className='col-span-2 shadow-lg text-center pl-12 py-3'>
          <Data />
          {/* <div className='container mx-auto grid grid-cols-2 gap-2'>{content}Data</div> */}
        </div>
        <div>
          <SidePanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
