import PuzzleEditorMenu from '@components/experience/editor-menu/puzzle-editor-menu';
import { useExperienceContext } from '@components/experience/ExperienceProvider';
import Sidebar from '@components/Sidebar';
import { EditingType } from '@hooks/states/UseEditingType';
import React, { useEffect } from 'react';

const EditPuzzlePage = () => {
  const { setEditingType } = useExperienceContext();

  useEffect(() => {
    setEditingType(EditingType.Numbering);
  }, [])

  return (
    <>
      <Sidebar />
      <main className='h-screen-responsive flex'>
        <PuzzleEditorMenu />
      </main>
    </>
  );
}

export default EditPuzzlePage
