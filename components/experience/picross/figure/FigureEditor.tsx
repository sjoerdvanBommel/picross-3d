import { FigureEditorAction } from "@components/experience/editor-menu/FigureEditorAction";
import { useBridgedExperienceContext } from "@components/experience/ExperienceCanvas";
import { useTweakableProperties } from "@hooks/use-tweakable-properties/UseTweakableProperties";
import { useTexture } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React, { useState } from 'react';
import { Color, Intersection, Vector3 } from "three";
import Block from "../Block";
import { IBlockProps } from "./IBlockProps";
import { IIndicatorBlockProps } from "./IIndicatorBlockProps";

const FigureEditor = () => {
  const tweakableProperties = useTweakableProperties({
    color: { value: '#3293df' },
    radius: { value: 0.07, min: 0, max: 0.5, step: 0.01 },
    margin: { value: 0.02, min: 0, max: 0.5, step: 0.01 },
    smoothness: { value: 7, min: 1, max: 10, step: 1 },
    scaleY: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleX: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleZ: { value: 1, min: 0.1, max: 10, step: 0.01 },
  }, 'Cube', true);

  const [blocksProps, setBlocksProps] = useState<IBlockProps[]>([{ figurePosition: new Vector3(), opacity: 1 }, { figurePosition: new Vector3(0, 0, 2), opacity: 1 }]);
  const [indicatorBlockProps, setIndicatorBlockProps] = useState<IIndicatorBlockProps>({ figurePosition: new Vector3(0, 1, 0), visible: true, opacity: .3 });
  const matcap = useTexture('/default-block-light.jpg');
  const { activeFigureAction } = useBridgedExperienceContext();

  const onEnterBlock = (intersections: Intersection[]) => {
    if (activeFigureAction === FigureEditorAction.DESTROYING) {
      intersections.forEach(intersection => {
        setBlockOpacity(intersection.object.userData.figurePosition, 1);
      });
      setBlockOpacity(intersections[0].object.userData.figurePosition, .3);
    }
  }
  const onHoverBlock = (intersection: Intersection) => {
    document.body.style.cursor = 'pointer';

    if (activeFigureAction === FigureEditorAction.BUILDING) {
      if (!indicatorBlockProps.visible) {
        showIndicatorBlock();
      }
      const newBlockPosition = getNewPicrossFigurePosition(intersection);
      if (!indicatorBlockProps.figurePosition.equals(newBlockPosition)) {
        setIndicatorBlockProps({ ...indicatorBlockProps, figurePosition: newBlockPosition });
      }
    }
    else if (activeFigureAction === FigureEditorAction.DESTROYING) {
      if (indicatorBlockProps.visible) {
        hideIndicatorBlock();
      }
      const pointedBlockProps = getBlockProps(intersection.object.userData.figurePosition);
      if (pointedBlockProps) {
        pointedBlockProps.opacity = 0.3;
        setBlockProps(pointedBlockProps.figurePosition, pointedBlockProps);
      }
    }
  };
  const onHoverNoBlock = () => {
    hideIndicatorBlock();
    document.body.style.cursor = 'move';
  }
  const onLeaveBlock = (figurePosition: Vector3, event: ThreeEvent<PointerEvent>) => {
    setBlockOpacity(figurePosition, 1);
    if (event.intersections.length === 0) {
      onHoverNoBlock();
    }
  }
  const onClickBlock = (intersection: Intersection) => {
    if (activeFigureAction === FigureEditorAction.BUILDING) {
      const newBlockPosition = getNewPicrossFigurePosition(intersection);
      setBlocksProps([...blocksProps, { figurePosition: newBlockPosition, opacity: 1 }]);
    }
    else if (activeFigureAction === FigureEditorAction.DESTROYING && blocksProps.length > 1) {
      setBlocksProps([...blocksProps].filter(x => !x.figurePosition.equals(intersection.object.userData.figurePosition)));
    }
  }

  const setBlockOpacity = (figurePosition: Vector3, opacity: number): void => {
    const newBlockProps = getBlockProps(figurePosition);
    if (newBlockProps) {
      newBlockProps.opacity = opacity;
      setBlockProps(figurePosition, newBlockProps);
    }
  }

  const hideIndicatorBlock = () => setIndicatorBlockProps({ ...indicatorBlockProps, visible: false });
  const showIndicatorBlock = () => setIndicatorBlockProps({ ...indicatorBlockProps, visible: true });

  const setBlockProps = (figurePosition: Vector3, newBlockProps: IBlockProps): void => {
    const newBlocksProps = [...blocksProps];
    const indexInArray = newBlocksProps.findIndex(x => x.figurePosition.equals(figurePosition)) ?? null;

    if (indexInArray != -1) {
      newBlocksProps[indexInArray] = newBlockProps;
      setBlocksProps(newBlocksProps);
    }
  }

  const getBlockProps = (figurePosition: Vector3): IBlockProps | null => {
    return blocksProps.find(x => x.figurePosition.equals(figurePosition)) ?? null;
  }

  const getNewPicrossFigurePosition = (intersection: Intersection): Vector3 => {
    const pointedBlockPosition = intersection.object.userData.figurePosition;
    const newBlockDirection = new Vector3(
      Math.round(intersection.face!.normal.x + (intersection.face!.normal.x > 0 ? -0.2 : 0.2)),
      Math.round(intersection.face!.normal.y + (intersection.face!.normal.y > 0 ? -0.2 : 0.2)),
      Math.round(intersection.face!.normal.z + (intersection.face!.normal.z > 0 ? -0.2 : 0.2))
    );
    return pointedBlockPosition.clone().add(newBlockDirection);
  }

  return (
    <>
      {blocksProps.map(blockProp =>
        <Block
          key={`${blockProp.figurePosition.x},${blockProp.figurePosition.y},${blockProp.figurePosition.z}`}
          scaleX={tweakableProperties.scaleX.value}
          scaleY={tweakableProperties.scaleY.value}
          scaleZ={tweakableProperties.scaleZ.value}
          margin={tweakableProperties.margin.value}
          radius={tweakableProperties.radius.value}
          smoothness={tweakableProperties.smoothness.value}
          color={new Color(tweakableProperties.color.value)}
          opacity={blockProp.opacity}
          matcap={matcap}
          figurePosition={blockProp.figurePosition}
          onEnter={onEnterBlock}
          onHover={onHoverBlock}
          onLeave={onLeaveBlock}
          onClick={onClickBlock}
        />
      )}
      <Block
        scaleX={tweakableProperties.scaleX.value}
        scaleY={tweakableProperties.scaleY.value}
        scaleZ={tweakableProperties.scaleZ.value}
        margin={tweakableProperties.margin.value}
        radius={tweakableProperties.radius.value}
        smoothness={tweakableProperties.smoothness.value}
        color={new Color(tweakableProperties.color.value)}
        opacity={indicatorBlockProps.opacity}
        matcap={matcap}
        figurePosition={indicatorBlockProps.figurePosition}
        visible={indicatorBlockProps.visible}
        isSelectable={false}
      />
    </>
  )
}

export default FigureEditor
