import { IBlockProps } from "@components/experience/picross/figure/IBlockProps";
import { useTweakableProperties } from "@hooks/tweakable-properties/UseTweakableProperties";
import { useTexture } from "@react-three/drei";
import { useState } from "react";
import { Vector3 } from "three";

export const useBlockProps = () => {
  const staticProperties = useTweakableProperties({
    color: { value: '#3293df' },
    radius: { value: 0.07, min: 0, max: 0.5, step: 0.01 },
    margin: { value: 0.02, min: 0, max: 0.5, step: 0.01 },
    smoothness: { value: 7, min: 1, max: 10, step: 1 },
    scaleY: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleX: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleZ: { value: 1, min: 0.1, max: 10, step: 0.01 },
  }, 'Block', true);
  const [blocksProps, setBlocksProps] = useState<IBlockProps[]>(
    [
      { figurePosition: new Vector3(0, 0, 0), opacity: 1 },
      { figurePosition: new Vector3(0, 0, 2), opacity: 1 }
    ]
  );
  const matcap = useTexture('/default-block-light.jpg');

  return { staticProperties, blocksProps, setBlocksProps, matcap };
}