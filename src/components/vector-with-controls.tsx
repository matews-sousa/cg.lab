import React, { useEffect, useState } from "react";
import { TVector } from "@/types/Scene2DConfig";
import { LaTeX, MovablePoint, Transform, vec, Vector } from "mafs";
import { useScene2DStore } from "@/store/scene2DStore";

export default function VectorWithControls({ vector }: { vector: TVector }) {
  const { setVectorTail, setVectorTip } = useScene2DStore();

  const [middle, setMiddle] = useState(vec.midpoint(vector.tail, vector.tip));
  const [translate, setTranslate] = useState([0, 0] as [number, number]);

  useEffect(() => {
    setMiddle(vec.midpoint(vector.tail, vector.tip));
    const direction = vec.sub(vector.tip, vector.tail);
    const unitVector = vec.normalize(direction);
    const orthogonal = [-unitVector[1], unitVector[0]] as [number, number];

    const offset = 0.5;
    const translateVec = vec.scale(orthogonal, offset);
    setTranslate(translateVec);
  }, [vector.tail, vector.tip]);

  return (
    <>
      <Vector tail={vector.tail} tip={vector.tip} color={vector.color} />

      {vector.label && (
        <Transform translate={translate}>
          <LaTeX at={middle} tex={String.raw`${vector.label}`} />
        </Transform>
      )}

      {vector.tailMovable && (
        <MovablePoint
          point={vector.tail}
          constrain={([x, y]: [number, number]) =>
            [Math.round(x), Math.round(y)] as [number, number]
          }
          onMove={newPosition => {
            setVectorTail(vector.id, newPosition);
          }}
        />
      )}

      {vector.tipMovable && (
        <MovablePoint
          point={vector.tip}
          onMove={newPosition => {
            setVectorTip(vector.id, newPosition);
          }}
          constrain={([x, y]: [number, number]) =>
            [Math.round(x), Math.round(y)] as [number, number]
          }
        />
      )}

      {vector.middleMovable && (
        <MovablePoint
          point={[
            (vector.tip[0] + vector.tail[0]) / 2,
            (vector.tip[1] + vector.tail[1]) / 2,
          ]}
          constrain={([x, y]: [number, number]) =>
            [Math.round(x), Math.round(y)] as [number, number]
          }
          onMove={newPosition => {
            const newTail = [
              newPosition[0] - (vector.tip[0] - vector.tail[0]) / 2,
              newPosition[1] - (vector.tip[1] - vector.tail[1]) / 2,
            ] as [number, number];

            const newTip = [
              newPosition[0] + (vector.tip[0] - vector.tail[0]) / 2,
              newPosition[1] + (vector.tip[1] - vector.tail[1]) / 2,
            ] as [number, number];

            setVectorTail(vector.id, newTail);
            setVectorTip(vector.id, newTip);
          }}
        />
      )}
    </>
  );
}
