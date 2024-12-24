import React, { useEffect, useState } from "react";
import { TVector } from "@/types/Scene2DConfig";
import { LaTeX, MovablePoint, Transform, vec, Vector } from "mafs";

export default function VectorWithControls({ vector }: { vector: TVector }) {
  const [tail, setTail] = useState(vector.tail);
  const [tip, setTip] = useState(vector.tip);
  const [middle, setMiddle] = useState(vec.midpoint(vector.tip, vector.tail));
  const [translate, setTranslate] = useState([0, 0] as [number, number]);

  useEffect(() => {
    setMiddle(vec.midpoint(tail, tip));

    const direction = vec.sub(tip, tail);
    const unitVector = vec.normalize(direction);
    const orthogonal = [-unitVector[1], unitVector[0]] as [number, number];

    const offset = 0.5;
    const translateVec = vec.scale(orthogonal, offset);
    setTranslate(translateVec);
  }, [tail, tip]);

  return (
    <>
      <Vector tail={tail} tip={tip} color={vector.color} />

      {vector.label && (
        <Transform translate={translate}>
          <LaTeX at={middle} tex={String.raw`${vector.label}`} />
        </Transform>
      )}

      {vector.tailMovable && (
        <MovablePoint
          point={tail}
          constrain={([x, y]: [number, number]) =>
            [Math.round(x), Math.round(y)] as [number, number]
          }
          onMove={newPosition => {
            setTail(newPosition);
          }}
        />
      )}

      {vector.tipMovable && (
        <MovablePoint
          point={tip}
          onMove={newPosition => {
            setTip(newPosition);
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

            setTail(newTail);
            setTip(newTip);
          }}
        />
      )}
    </>
  );
}
