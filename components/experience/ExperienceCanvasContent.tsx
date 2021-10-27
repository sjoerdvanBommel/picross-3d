import { OrbitControls } from '@react-three/drei';
import React from 'react';
import FigureEditor from './picross/figure/FigureEditor';

const ExperienceCanvasContent = () => {
  return (
    <>
      <FigureEditor />
      <OrbitControls />
    </>
  )
}

export default ExperienceCanvasContent
