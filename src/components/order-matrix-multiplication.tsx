import { Fragment, useEffect, useState } from "react";
import "katex/dist/katex.min.css";
import Latex from "react-latex-next";
import { Matrix3, Matrix4 } from "three";
import { useOrderMatrixStore } from "@/store/orderMatrixMultiplicationStore";
import { useScene2DStore } from "@/store/scene2DStore";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "lucide-react";
import { Button } from "./ui/button";

export default function OrderMatrixMultiplication() {
  const {
    matricesOptions,
    objectsMatrices,
    updateObjectMatrix,
    setObjectMatrices,
  } = useOrderMatrixStore();
  const { getPolygon, setPolygonPoints } = useScene2DStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [activeMatrix, setActiveMatrix] = useState<Matrix3 | Matrix4 | null>(
    null
  );

  useEffect(() => {
    Object.keys(objectsMatrices).forEach(objectKey => {
      const sceneObject = getPolygon(objectKey);
      const objectMatrices = objectsMatrices[objectKey] || [];
      const newPoints = sceneObject?.originalPoints?.map(point => {
        const modelMatrix = new Matrix3().identity();
        objectMatrices.forEach(matrix => {
          if (matrix instanceof Matrix3) {
            modelMatrix.multiply(matrix);
          }
        });

        const [x, y] = point.position;
        const w = 1;
        const newX =
          modelMatrix.elements[0] * x +
          modelMatrix.elements[1] * y +
          modelMatrix.elements[2] * w;
        const newY =
          modelMatrix.elements[3] * x +
          modelMatrix.elements[4] * y +
          modelMatrix.elements[5] * w;
        return {
          id: point.id,
          position: [newX, newY] as [number, number],
          movable: false,
        };
      });
      if (sceneObject && newPoints)
        setPolygonPoints(sceneObject?.id, newPoints);
    });
  }, [objectsMatrices, getPolygon, setPolygonPoints]);

  const onDragStart = (event: DragStartEvent) => {
    setActiveMatrix(
      objectsMatrices.square1[Number(String(event.active.id).split("-")[2])]
    );
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      console.log("active", active.id);
      console.log("over", over.id);
      const objectKey = "square1";
      const activeIndex = Number(String(active.id).split("-")[2]);
      const overIndex = Number(String(over.id).split("-")[2]);
      setObjectMatrices(
        objectKey,
        arrayMove(objectsMatrices[objectKey], activeIndex, overIndex)
      );
      setActiveMatrix(null);
    }
  };

  const handleOptionClick = (option: {
    id: string;
    matrix: Matrix3 | Matrix4;
  }) => {
    const objectKey = Object.keys(objectsMatrices)[0];
    if (objectKey in objectsMatrices) {
      updateObjectMatrix(
        objectKey,
        objectsMatrices[objectKey].length,
        option.matrix
      );
    }
  };

  const handleRemoveMatrix = (index: number) => {
    const objectKey = Object.keys(objectsMatrices)[0];
    if (objectKey in objectsMatrices) {
      const newMatrices = objectsMatrices[objectKey].filter(
        (_, i) => i !== index
      );
      setObjectMatrices(objectKey, newMatrices);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-4 relative">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {Object.keys(objectsMatrices).map(objectKey => (
          <SortableContext
            key={objectKey}
            items={objectsMatrices[objectKey].map(
              (_, index) => `matrix-${objectKey}-${index}`
            )}
            strategy={horizontalListSortingStrategy}
          >
            <Droppable objectKey={objectKey}>
              {objectsMatrices[objectKey]?.length > 0 ? (
                objectsMatrices[objectKey].map((matrix, index) => (
                  <Fragment key={index}>
                    <div className="relative">
                      <SortableItem
                        matrix={matrix}
                        id={`matrix-${objectKey}-${index}`}
                      />
                      <Button
                        size="icon"
                        variant="destructive"
                        className="absolute -top-3 -right-3 text-xs rounded-full p-1 w-8 h-8"
                        onClick={() => handleRemoveMatrix(index)}
                      >
                        <Trash size={20} />
                      </Button>
                    </div>
                    {index < objectsMatrices[objectKey].length - 1 && (
                      <Latex>
                        {`$$
                        \\times
                        $$`}
                      </Latex>
                    )}
                  </Fragment>
                ))
              ) : (
                <div className="text-gray-400">
                  Escolha as matrizes para serem ordenadas
                </div>
              )}
            </Droppable>
          </SortableContext>
        ))}

        <DragOverlay>
          {activeMatrix && (
            <div className="text-sm bg-blue-500 hover:bg-blue-600 rounded-md text-white opacity-40">
              <MatrixLatex matrix={activeMatrix} />
            </div>
          )}
        </DragOverlay>
      </DndContext>
      <div className="absolute -top-52 -left-8 bg-white p-2 rounded-md flex gap-2">
        {matricesOptions.map(option => (
          <button
            key={option.id}
            onClick={() => handleOptionClick(option)}
            className="text-sm bg-blue-500 hover:bg-blue-600 rounded-md text-white"
          >
            <MatrixLatex matrix={option.matrix} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Droppable({
  children,
  objectKey,
}: {
  children?: React.ReactNode;
  objectKey: string;
}) {
  const { setNodeRef } = useDroppable({
    id: objectKey,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex items-center justify-center gap-2 bg-gray-100 p-0 rounded-lg shadow w-full h-32"
    >
      {children}
    </div>
  );
}

function SortableItem({
  matrix,
  id,
}: {
  matrix: Matrix3 | Matrix4;
  id: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative text-sm bg-blue-500 hover:bg-blue-600 rounded-md text-white"
    >
      <MatrixLatex matrix={matrix} />
    </div>
  );
}

function MatrixLatex({ matrix }: { matrix: Matrix3 | Matrix4 }) {
  return (
    <div className="text-sm p-1 rounded-md">
      {matrix instanceof Matrix3 ? (
        <Latex>
          {`$$
          \\begin{bmatrix}
            ${matrix.elements[0]} & ${matrix.elements[1]} & ${matrix.elements[2]} \\\\
            ${matrix.elements[3]} & ${matrix.elements[4]} & ${matrix.elements[5]} \\\\
            ${matrix.elements[6]} & ${matrix.elements[7]} & ${matrix.elements[8]} \\\\
          \\end{bmatrix}
          $$`}
        </Latex>
      ) : (
        <Latex>
          {`$$
          \\begin{bmatrix}
            ${matrix.elements[0]} & ${matrix.elements[1]} & ${matrix.elements[2]} & ${matrix.elements[3]} \\\\
            ${matrix.elements[4]} & ${matrix.elements[5]} & ${matrix.elements[6]} & ${matrix.elements[7]} \\\\
            ${matrix.elements[8]} & ${matrix.elements[9]} & ${matrix.elements[10]} & ${matrix.elements[11]} \\\\
            ${matrix.elements[12]} & ${matrix.elements[13]} & ${matrix.elements[14]} & ${matrix.elements[15]} \\\\
          \\end{bmatrix}
          $$`}
        </Latex>
      )}
    </div>
  );
}
