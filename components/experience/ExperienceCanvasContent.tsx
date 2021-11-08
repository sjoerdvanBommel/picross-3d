import { EditingType } from '@hooks/states/UseEditingType';
import { IStaticBlockProps, useBlockProps } from '@hooks/tweakable-properties/UseBlockProps';
import { Values } from '@hooks/tweakable-properties/UseTweakableProperties';
import { OrbitControls } from '@react-three/drei';
import React, { createContext, useContext } from 'react';
import { Texture } from 'three';
import { useExperienceContext } from './ExperienceProvider';
import FigureEditor from './picross/figure/FigureEditor';
import { IBlockProps } from './picross/figure/IBlockProps';
import PuzzleEditor from './picross/puzzle/PuzzleEditor';

interface IEditorContext {
  staticBlockProps: Values<IStaticBlockProps>;
  blocksProps: IBlockProps[],
  setBlocksProps: (_: IBlockProps[]) => void,
  matcap: Texture
}

const EditorContext = createContext<IEditorContext>(null!);
export const useEditorContext = () => useContext(EditorContext);

const ExperienceCanvasContent = () => {
  const { editingType } = useExperienceContext();
  const blockProps = useBlockProps();

  return (
    <>
      <EditorContext.Provider value={{ ...blockProps }}>
        {editingType === EditingType.Constructing && <FigureEditor />}
        {editingType === EditingType.Numbering && <PuzzleEditor />}
      </EditorContext.Provider>
      <OrbitControls />
    </>
  )
}

export default ExperienceCanvasContent
