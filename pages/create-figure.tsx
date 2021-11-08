import FigureEditorMenu from '@components/experience/editor-menu/figure-editor-menu';
import Sidebar from '@components/Sidebar';
import React from 'react';

const CreatePuzzlePage = () => {
  return (
    <>
      <Sidebar />
      <main className='h-screen-responsive flex'>
        <FigureEditorMenu />
      </main>
    </>
  );
}

export default CreatePuzzlePage
