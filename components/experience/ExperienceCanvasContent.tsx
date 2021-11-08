import { EditingType } from '@hooks/states/UseEditingType';
import { OrbitControls } from '@react-three/drei';
import React from 'react';
import { useBridgedExperienceContext } from './ExperienceCanvas';
import FigureEditor from './picross/figure/FigureEditor';
import PuzzleEditor from './picross/puzzle/PuzzleEditor';


const ExperienceCanvasContent = () => {
  const { editingType } = useBridgedExperienceContext();

  return (
    <>
      {editingType === EditingType.Constructing && <FigureEditor />}
      {editingType === EditingType.Numbering && <PuzzleEditor />}
      <OrbitControls />
    </>
  )
}

export default ExperienceCanvasContent
