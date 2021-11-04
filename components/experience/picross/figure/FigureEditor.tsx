import { FigureEditorAction } from "@components/experience/editor-menu/FigureEditorAction";
import { useBridgedExperienceContext } from "@components/experience/ExperienceCanvas";
import { useTweakableProperties } from "@hooks/use-tweakable-properties/UseTweakableProperties";
import { useTexture } from "@react-three/drei";
import React, { useState } from 'react';
import { Color, Intersection, Vector3 } from "three";
import Block from "../Block";
import { IBlockProps } from "./IBlockProps";
import { IIndicatorBlockProps } from "./IIndicatorBlockProps";

const FigureEditor = () => {
  const tweakableProperties = useTweakableProperties({
    color: { value: '#3293df' },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    radius: { value: 0.07, min: 0, max: 0.5, step: 0.01 },
    margin: { value: 0.02, min: 0, max: 0.5, step: 0.01 },
    smoothness: { value: 7, min: 1, max: 10, step: 1 },
    scaleY: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleX: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleZ: { value: 1, min: 0.1, max: 10, step: 0.01 },
  }, 'Cube', true);

  const [blockProps, setBlockProps] = useState<IBlockProps[]>([{ figurePosition: new Vector3() }, { figurePosition: new Vector3(0, 0, 1) }]);
  const [indicatorBlockProps, setIndicatorBlockProps] = useState<IIndicatorBlockProps>({ figurePosition: new Vector3(0, 1, 0), visible: true });
  const matcap = useTexture('/default-block-light.jpg');
  const { activeFigureAction } = useBridgedExperienceContext();

  const hideIndicatorBlockIfNoHover = () => {
    document.body.style.cursor = 'move';
    hideIndicatorBlock();
  }
  const hideIndicatorBlock = () => setIndicatorBlockProps({ ...indicatorBlockProps, visible: false });
  const showIndicatorBlock = () => setIndicatorBlockProps({ ...indicatorBlockProps, visible: true });

  const onHoverBlock = (intersection: Intersection) => {
    document.body.style.cursor = 'pointer';
    if (activeFigureAction === FigureEditorAction.BUILDING) {
      if (!indicatorBlockProps.visible) {
        showIndicatorBlock();
      }
      const newBlockPosition = getNewPicrossObjectPosition(intersection);
      if (!indicatorBlockProps.figurePosition.equals(newBlockPosition)) {
        setIndicatorBlockProps({ ...indicatorBlockProps, figurePosition: newBlockPosition });
      }
    }
    else if (activeFigureAction === FigureEditorAction.DESTROYING) {
      if (indicatorBlockProps.visible) {
        hideIndicatorBlock();
      }
      // const pointedBlock = this.figure.getBlock(intersect.object);
      // if (pointedBlock) {
      //   this.figure.getBlocks().forEach(block => block.setOpacity(1));
      //   if (!pointedBlock.isInitial) {
      //     pointedBlock.setOpacity(0.5);
      //   }
      // }
    }
  };

  const getNewPicrossObjectPosition = (intersection: Intersection): Vector3 => {
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
      {blockProps.map((blockProp, i) =>
        <Block
          key={i}
          scaleX={tweakableProperties.scaleX.value}
          scaleY={tweakableProperties.scaleY.value}
          scaleZ={tweakableProperties.scaleZ.value}
          margin={tweakableProperties.margin.value}
          radius={tweakableProperties.radius.value}
          smoothness={tweakableProperties.smoothness.value}
          color={new Color(tweakableProperties.color.value)}
          opacity={tweakableProperties.opacity.value}
          matcap={matcap}
          figurePosition={blockProp.figurePosition}
          onHover={onHoverBlock}
          onLeave={hideIndicatorBlockIfNoHover}
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
        opacity={0.3}
        matcap={matcap}
        figurePosition={indicatorBlockProps.figurePosition}
        visible={indicatorBlockProps.visible}
        isSelectable={false}
      />
    </>
  )
}

export default FigureEditor


// class FigureEditor2 extends Editor {
//   private indicatorBlock: Block;

//   constructor(figure: Figure) {
//     super(figure, FigureEditorAction.BUILDING);

//     this.indicatorBlock = new Block({ x: 1, y: 0, z: 0, isInitial: false, opacity: .3, destroyable: false }, this.figure);
//     this.indicatorBlock.visible = false;

//     this.scene.add(this.indicatorBlock);

//     this.setTweaks();
//   }

//   private get figure(): Figure {
//     return this.picrossObject as Figure;
//   }

//   public replaceFigure = (figure: Figure) => {
//     this.figure.dispose();
//     this.picrossObject = figure;
//     this.indicatorBlock.figure = figure;
//     this.indicatorBlock.geometry = figure.getBlockGeometry();
//   }

//   public setActiveAction = (activeAction: FigureEditorAction) => {
//     this.activeAction = activeAction;
//   }

//   public getFigure = (): Figure => {
//     return this.figure;
//   }

//   public dispose = () => {
//     this.figure.dispose();
//     this.indicatorBlock.geometry.dispose();
//     this.indicatorBlock.getMaterial().dispose();
//   }

//   private addBlock = (intersect: Intersection<Object3D>) => {
//     const newBlockPosition = this.getNewPicrossObjectPosition(intersect);
//     if (newBlockPosition) {
//       this.figure.addBlock(new Block({ ...newBlockPosition, isInitial: false, opacity: 1, destroyable: false }, this.figure));
//     }
//   }

//   private customizeBlock = (intersect: Intersection<Object3D>) => {
//     console.log('customize', intersect);
//   }

//   private removeBlock = (intersect: Intersection<Object3D>) => {
//     const clickedBlock = this.figure.getBlock(intersect.object);
//     if (clickedBlock && !clickedBlock.isInitial) {
//       this.figure.removeBlock(clickedBlock);
//     }
//   }

//   private setTweaks = () => {
//     const blockFolder = this.experience.tweakpane!.folders.block;
//     blockFolder.on('change', () => {
//       this.indicatorBlock.geometry = this.figure.getBlockGeometry();
//     })
//   }

//   public actionOnClick: { [editorAction: string]: (intersect: Intersection<Object3D>) => void; } = {
//     [FigureEditorAction.BUILDING.toString()]: this.addBlock,
//     [FigureEditorAction.DESTROYING.toString()]: this.removeBlock,
//     [FigureEditorAction.CUSTOMIZING.toString()]: this.customizeBlock,
//   };
// }