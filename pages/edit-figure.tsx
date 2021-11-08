import FigureEditorMenu from '@components/experience/editor-menu/figure-editor-menu';
import { useExperienceContext } from '@components/experience/ExperienceProvider';
import Sidebar from '@components/Sidebar';
import { EditingType } from '@hooks/states/UseEditingType';
import React, { useEffect } from 'react';

const EditFigurePage = () => {
  const { setEditingType } = useExperienceContext();

  useEffect(() => {
    setEditingType(EditingType.Constructing);
  }, [])

  return (
    <>
      <Sidebar />
      <main className='h-screen-responsive flex'>
        <FigureEditorMenu />
      </main>
    </>
  );
}

export default EditFigurePage
