import { FigureEditorAction } from "@components/experience/editor-menu/FigureEditorAction";
import { useEditorContext } from "@components/experience/ExperienceCanvasContent";
import { useExperienceContext } from "@components/experience/ExperienceProvider";
import { ThreeEvent } from "@react-three/fiber";
import React, { useState } from 'react';
import { Color, Intersection, Vector3 } from "three";
import Block from "../Block";
import { IBlockProps } from "./IBlockProps";
import { IIndicatorBlockProps } from "./IIndicatorBlockProps";

const FigureEditor = () => {
  const { staticBlockProps, blocksProps, setBlocksProps, matcap } = useEditorContext();
  const [indicatorBlockProps, setIndicatorBlockProps] = useState<IIndicatorBlockProps>({ figurePosition: new Vector3(0, 1, 0), visible: false, opacity: .3 });
  const { activeFigureAction } = useExperienceContext();

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
      if (!blocksProps.find(x => x.figurePosition.equals(newBlockPosition))) {
        setBlocksProps([...blocksProps, { figurePosition: newBlockPosition, opacity: 1 }]);
      }
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
          {...staticBlockProps}
          color={new Color(staticBlockProps.color)}
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
        {...staticBlockProps}
        color={new Color(staticBlockProps.color)}
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
