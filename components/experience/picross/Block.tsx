import { RoundedBox } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import { Color, Intersection, Mesh, Texture, Vector3 } from 'three'

type BlockProps = {
  scaleX: number,
  scaleY: number,
  scaleZ: number,
  margin: number,
  radius: number,
  smoothness: number,
  color: Color,
  opacity: number,
  matcap: Texture,
  figurePosition: Vector3,
  onHover?: (intersection: Intersection) => void,
  onLeave?: () => void,
  visible?: boolean,
  isSelectable?: boolean
}

const Block = ({ scaleX, scaleY, scaleZ, margin, radius, smoothness, color, opacity, matcap, figurePosition, onHover, onLeave, visible = true, isSelectable = true }: BlockProps) => {
  const ref = useRef<Mesh>(null!);

  useEffect(() => {
    ref.current.userData = {
      isSelectable,
      figurePosition
    }
  }, [ref]);

  const toRealPosition = (figurePosition: Vector3) => {
    return figurePosition.clone().multiply(new Vector3(scaleX + (scaleX * margin), scaleY + (scaleY * margin), scaleZ + (scaleZ * margin)));
  }

  return (
    <RoundedBox
      ref={ref}
      args={[scaleX, scaleY, scaleZ]}
      position={toRealPosition(figurePosition)}
      radius={radius}
      smoothness={smoothness}
      onPointerMove={(event) => {
        const selectableObjectIntersections = event.intersections.filter(x => x.object.userData.isSelectable);
        if (selectableObjectIntersections.length > 0 && ref.current === selectableObjectIntersections[0].eventObject) {
          onHover?.(selectableObjectIntersections[0]);
        }
      }}
      onPointerLeave={(event) => {
        const selectableObjectIntersections = event.intersections.filter(x => x.object.userData.isSelectable);
        if (selectableObjectIntersections.length === 0) {
          onLeave?.();
        }
      }}
      visible={visible}
    >
      <meshMatcapMaterial
        matcap={matcap}
        color={color}
        transparent={true}
        opacity={opacity}
      />
    </RoundedBox>
  )
}

export default Block
