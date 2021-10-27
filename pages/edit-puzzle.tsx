import PuzzleEditorMenu from '@components/experience/editor-menu/puzzle-editor-menu';
import Sidebar from '@components/Sidebar';
import React from 'react';

const EditPage = () => {
  return (
    <>
      <Sidebar />
      <main className='h-screen-responsive flex'>
        <PuzzleEditorMenu />
      </main>
    </>
  );
}

export default EditPage
