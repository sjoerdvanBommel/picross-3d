import FigureEditorMenu from '@components/experience/editor-menu/figure-editor-menu';
import PuzzleEditorMenu from '@components/experience/editor-menu/puzzle-editor-menu';
import { useExperienceContext } from '@components/experience/ExperienceProvider';
import Sidebar from '@components/Sidebar';
import { EditingType } from '@hooks/states/UseEditingType';
import React from 'react';

const CreatePuzzlePage = () => {
  const { editingType } = useExperienceContext();

  return (
    <>
      <Sidebar />
      <main className='h-screen-responsive flex'>
        {editingType === EditingType.Constructing && <FigureEditorMenu />}
        {editingType === EditingType.Numbering && <PuzzleEditorMenu />}
      </main>
    </>
  );
}

export default CreatePuzzlePage
