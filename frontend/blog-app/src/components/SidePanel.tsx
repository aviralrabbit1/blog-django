import React from 'react'
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const SidePanel = () => {
  return (
    <div className='shadow-lg'>
        <div className='text-center py-5'>
            <h3 className='font-bold'>Welcome to my blog!</h3>
            <p>100s of blogs!</p>
            <div className='flex gap-2 flex-wrap justify-evenly mt-3'>
                <div className='cursor-pointer'>
                    <EditNoteIcon />
                    <p>Start Writing today!</p>
                </div>
                <div className='cursor-pointer'>
                    <ShoppingCartIcon />
                    <p>Buy premium!</p>                        
                </div>
                <div className='cursor-pointer'>
                    <AssignmentIndIcon />
                    <p>Search someone</p>
                </div>
                <div className='cursor-pointer'>
                    <BookmarksIcon />
                    Bookmark articles
                </div>
            </div>

        </div>
    </div>
  )
}

export default SidePanel
