import { FigureEditorAction } from "@components/experience/editor-menu/FigureEditorAction";
import { useBridgedExperienceContext } from "@components/experience/ExperienceCanvas";
import { useTweakableProperties } from "@hooks/use-tweakable-properties/UseTweakableProperties";
import { RoundedBox, useTexture } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import React from 'react';


const FigureEditor = () => {
  const tweakableProperties = useTweakableProperties({
    color: { value: '#3293df' },
    opacity: { value: 1, min: 0, max: 1, step: 0.01 },
    radius: { value: 0.1, min: 0, max: 0.5, step: 0.01 },
    smoothness: { value: 7, min: 1, max: 10, step: 1 },
    scaleY: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleX: { value: 1, min: 0.1, max: 10, step: 0.01 },
    scaleZ: { value: 1, min: 0.1, max: 10, step: 0.01 },
  }, 'Cube', true);

  const matcap = useTexture('/default-block-light.jpg');
  const { activeFigureAction: activeAction } = useBridgedExperienceContext();

  const onMouseHoverBlock = (event: ThreeEvent<PointerEvent>) => {
    document.body.style.cursor = 'pointer';
    if (activeAction === FigureEditorAction.BUILDING) {
      console.log('building');
      // if (!this.indicatorBlock.visible) {
      //   this.indicatorBlock.visible = true;
      // }
      // const newBlockPosition = this.getNewPicrossObjectPosition(intersect);
      // if (newBlockPosition && !this.indicatorBlock.figurePosition.equals(newBlockPosition) && !this.figure.getBlock(newBlockPosition)) {
      //   this.indicatorBlock.figurePosition = newBlockPosition;
      // }
    }
    else if (activeAction === FigureEditorAction.DESTROYING) {
      console.log('destroying');

      // const pointedBlock = this.figure.getBlock(intersect.object);
      // if (pointedBlock) {
      //   this.figure.getBlocks().forEach(block => block.setOpacity(1));
      //   if (!pointedBlock.isInitial) {
      //     pointedBlock.setOpacity(0.5);
      //   }
      // }
    }
  };

  return (
    <RoundedBox
      args={[tweakableProperties.scaleX.value, tweakableProperties.scaleY.value, tweakableProperties.scaleZ.value]}
      radius={tweakableProperties.radius.value}
      smoothness={tweakableProperties.smoothness.value}
      onPointerMove={onMouseHoverBlock}
    >
      <meshMatcapMaterial
        matcap={matcap}
        color={tweakableProperties.color.value}
        transparent={true}
        opacity={tweakableProperties.opacity.value}
      />
    </RoundedBox>
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

//   public onNoMouseHoverBlock = () => {
//     document.body.style.cursor = 'move';
//     if (this.activeAction === FigureEditorAction.BUILDING && this.indicatorBlock.visible) {
//       this.indicatorBlock.visible = false;
//     }
//     this.figure.getBlocks().forEach(block => block.setOpacity(1));
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