import { PuzzleEditorAction } from '@components/experience/editor-menu/PuzzleEditorAction';
import { useEditorContext } from '@components/experience/ExperienceCanvasContent';
import { useExperienceContext } from '@components/experience/ExperienceProvider';
import { Html } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { Color, Vector3 } from 'three';
import { IBlockProps } from '../../picross/figure/IBlockProps';
import Block from '../Block';

const PuzzleEditor = () => {
  const { staticBlockProps, blocksProps, matcap, indicators, setIndicators } = useEditorContext();
  const [puzzleBlocks, setPuzzleBlocks] = useState<IBlockProps[]>([]);
  const { activePuzzleAction } = useExperienceContext();

  useEffect(() => {
    let extraBlocks = [];
    const xPositions = blocksProps.map(x => x.figurePosition.x);
    const yPositions = blocksProps.map(x => x.figurePosition.y);
    const zPositions = blocksProps.map(x => x.figurePosition.z);
    const minX = Math.min(...xPositions);
    const maxX = Math.max(...xPositions);
    const minY = Math.min(...yPositions);
    const maxY = Math.max(...yPositions);
    const minZ = Math.min(...zPositions);
    const maxZ = Math.max(...zPositions);

    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        for (let z = minZ; z <= maxZ; z++) {
          if (!blocksProps.find(props => props.figurePosition.equals(new Vector3(x, y, z)))) {
            extraBlocks.push({
              opacity: 1,
              figurePosition: new Vector3(x, y, z)
            })
          }
        }
      }
    }
    setPuzzleBlocks(extraBlocks);
  }, [])

  const onClickBlock = (event: ThreeEvent<MouseEvent>): void => {
    if (
      activePuzzleAction === PuzzleEditorAction.ADDING_NUMBERS && event.button === 0 ||
      activePuzzleAction === PuzzleEditorAction.REMOVING_NUMBERS && event.button === 2
    ) {
      const indicator = generateIndicator(event);
      if (!indicators.find(x => x.equals(indicator))) {
        setIndicators([...indicators, indicator]);
      }
    }

    if (
      activePuzzleAction === PuzzleEditorAction.ADDING_NUMBERS && event.button === 2 ||
      activePuzzleAction === PuzzleEditorAction.REMOVING_NUMBERS && event.button === 0
    ) {
      const indicator = indicators.find(x => x.equals(generateIndicator(event)));
      if (indicator) {
        setIndicators([...indicators.filter(x => x !== indicator)]);
      }
    }
  }

  const generateIndicator = (event: ThreeEvent<MouseEvent>) => {
    const intersection = event.intersections[0];
    const indicator = new Vector3(Infinity, Infinity, Infinity);
    const { x, y, z } = intersection.face?.normal!;
    if (x === 1 || x === -1 || y === 1 || y === -1 || z === 1 || z === -1) {
      if (x === 0) {
        indicator.x = intersection.object.userData.figurePosition.x;
      }
      if (y === 0) {
        indicator.y = intersection.object.userData.figurePosition.y;
      }
      if (z === 0) {
        indicator.z = intersection.object.userData.figurePosition.z;
      }
    }
    return indicator;
  }

  // const removeNumber = (intersect: Intersection<Object3D>): void => {
  //   const newPicrossObjectPosition = this.getNewPicrossObjectPosition(intersect)!;
  //   const number = this.numbers.find(number => number.figurePosition.equals(newPicrossObjectPosition));
  //   console.log(this.numbers, newPicrossObjectPosition);
  //   if (number) {
  //     this.numbers = this.numbers.filter(x => x.figurePosition !== number.figurePosition);
  //     this.scene.remove(number as unknown as Object3D);
  //   }
  // }

  const indicatorsInDirection = (direction: 'x' | 'y' | 'z'): any[][] => {
    return indicators.filter(indicator => indicator[direction] === Infinity).map(indicator => {
      const positions = blocksProps.map(x => x.figurePosition[direction]);
      const min = Math.min(...positions);
      const max = Math.max(...positions);

      const numbers = [];

      let currentNumber = -1;
      for (let i = min; i <= max; i++) {
        if (blocksProps.find(props => props.figurePosition.equals(
          new Vector3(
            direction === 'x' ? i : indicator.x,
            direction === 'y' ? i : indicator.y,
            direction === 'z' ? i : indicator.z)
        ))) {
          currentNumber++;
        }
        else if (currentNumber !== -1) {
          numbers.push(currentNumber + 1);
          currentNumber = -1;
        }
      }
      if (currentNumber !== -1) {
        numbers.push(currentNumber + 1);
      }
      if (numbers.length === 0) {
        numbers.push(0);
      }

      return numbers.map((number, index) => (
        <>
          <Html key={((index * 2))} occlude={true} center position={
            new Vector3(
              direction === 'x' ? max + (index + 1) : indicator.x,
              direction === 'y' ? max + (index + 1) : indicator.y,
              direction === 'z' ? max + (index + 1) : indicator.z)}>
            <h2 className="text-white select-none">{number}</h2>
          </Html>
          <Html key={((index * 2) + 1)} occlude={true} center position={
            new Vector3(
              direction === 'x' ? min - 1 : indicator.x,
              direction === 'y' ? min - 1 : indicator.y,
              direction === 'z' ? min - 1 : indicator.z)}>
            <h2 className="text-white select-none">{number}</h2>
          </Html>
        </>
      ));
    })
  }

  return (
    <>
      {[...blocksProps, ...puzzleBlocks].map(blockProps => (
        <Block
          key={`${blockProps.figurePosition.x},${blockProps.figurePosition.y},${blockProps.figurePosition.z}`}
          {...staticBlockProps}
          color={new Color(staticBlockProps.color)}
          opacity={blockProps.opacity}
          matcap={matcap}
          figurePosition={blockProps.figurePosition}
          visible={true}
          onClick={onClickBlock}
        />
      ))}
      {indicatorsInDirection('x')}
      {indicatorsInDirection('y')}
      {indicatorsInDirection('z')}
    </>
  )
}

export default PuzzleEditor