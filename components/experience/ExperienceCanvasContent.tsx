import { EditingType } from '@hooks/states/UseEditingType';
import { IStaticBlockProps, useBlockProps } from '@hooks/tweakable-properties/UseBlockProps';
import { Values } from '@hooks/tweakable-properties/UseTweakableProperties';
import { OrbitControls } from '@react-three/drei';
import React, { createContext, useContext, useState } from 'react';
import { Texture, Vector3 } from 'three';
import { useExperienceContext } from './ExperienceProvider';
import FigureEditor from './picross/figure/FigureEditor';
import { IBlockProps } from './picross/figure/IBlockProps';
import PuzzleEditor from './picross/puzzle/PuzzleEditor';

interface IEditorContext {
  staticBlockProps: Values<IStaticBlockProps>;
  blocksProps: IBlockProps[],
  setBlocksProps: (_: IBlockProps[]) => void,
  indicators: Vector3[],
  setIndicators: (_: Vector3[]) => void,
  matcap: Texture
}

const EditorContext = createContext<IEditorContext>(null!);
export const useEditorContext = () => useContext(EditorContext);

const ExperienceCanvasContent = () => {
  const { editingType } = useExperienceContext();
  const blockProps = useBlockProps();
  const [indicators, setIndicators] = useState<Vector3[]>([new Vector3(0, Infinity, 0)]);

  return (
    <>
      <EditorContext.Provider value={{ ...blockProps, indicators, setIndicators }}>
        {editingType === EditingType.Constructing && <FigureEditor />}
        {editingType === EditingType.Numbering && <PuzzleEditor />}
      </EditorContext.Provider>
      <OrbitControls />
    </>
  )
}

export default ExperienceCanvasContent
