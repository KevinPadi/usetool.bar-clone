import { useEffect, useRef, useState } from "react";
import { useAnimationControls } from "motion/react";
import Toolbar from "./Toolbar";

export default function DragContainer() {
  const controls = useAnimationControls();
  const topBoxRef = useRef<HTMLDivElement>(null);
  const bottomBoxRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightBoxRef = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

  const initialDraggableCenter = useRef({ x: 0, y: 0 });
  const [lastKnownPosition, setLastKnownPosition] = useState({ x: 0, y: 0 });
  const [currentBox, setCurrentBox] = useState<boolean>(false);

  // Array de todas las referencias a las cajas y sus estados correspondientes
  const allBoxRefs = [topBoxRef, bottomBoxRef, leftBoxRef, rightBoxRef];
  const boxNames = ["top", "bottom", "left", "right"]; // Orden igual que allBoxRefs

  // Calcula la posición inicial del círculo para que esté centrado en la Caja Superior
  useEffect(() => {
    if (bottomBoxRef.current && draggableRef.current) {
      const bottomBoxRect = bottomBoxRef.current.getBoundingClientRect();
      const draggableRect = draggableRef.current.getBoundingClientRect();

      initialDraggableCenter.current = {
        x: draggableRect.left + draggableRect.width / 2,
        y: draggableRect.top + draggableRect.height / 2,
      };

      const bottomBoxCenterX = bottomBoxRect.left + bottomBoxRect.width / 2;
      const bottomBoxCenterY = bottomBoxRect.top + bottomBoxRect.height / 2;

      const initialDraggableX =
        bottomBoxCenterX - initialDraggableCenter.current.x;
      const initialDraggableY =
        bottomBoxCenterY - initialDraggableCenter.current.y;

      controls.start({
        x: initialDraggableX,
        y: initialDraggableY,
        transition: { duration: 0 },
      });
      setLastKnownPosition({ x: initialDraggableX, y: initialDraggableY });
    }
  }, [controls]);

  const isOverlapping = (rect1: DOMRect, rect2: DOMRect) => {
    return (
      rect1.left < rect2.right &&
      rect1.right > rect2.left &&
      rect1.top < rect2.bottom &&
      rect1.bottom > rect2.top
    );
  };

  const handleDrag = () => {
    if (!draggableRef.current) return;
  };

  const handleDragEnd = () => {
    if (!draggableRef.current) return;

    const draggableRect = draggableRef.current.getBoundingClientRect();

    let targetBoxRect: DOMRect | null = null;
    let newX = lastKnownPosition.x; // Por defecto, vuelve a la última posición conocida
    let newY = lastKnownPosition.y; // Por defecto, vuelve a la última posición conocida
    let snappedToBox = false;
    let foundBox: string | null = null;

    for (let i = 0; i < allBoxRefs.length; i++) {
      const ref = allBoxRefs[i];
      const boxRect = ref.current?.getBoundingClientRect();
      if (boxRect && isOverlapping(draggableRect, boxRect)) {
        targetBoxRect = boxRect;
        snappedToBox = true;
        foundBox = boxNames[i]; // Guarda el nombre de la caja
        break;
      }
    }

    if (snappedToBox && targetBoxRect) {
      const targetBoxCenterX = targetBoxRect.left + targetBoxRect.width / 2;
      const targetBoxCenterY = targetBoxRect.top + targetBoxRect.height / 2;

      newX = targetBoxCenterX - initialDraggableCenter.current.x;
      newY = targetBoxCenterY - initialDraggableCenter.current.y;

      setCurrentBox(foundBox === "right" || foundBox === "left" ? true : false); // Actualiza el estado con la caja actual
      setLastKnownPosition({ x: newX, y: newY });
    }
    // Si no se soltó en una caja, newX y newY ya están configurados para volver a lastKnownPosition

    controls.start({
      x: newX,
      y: newY,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    });
  };

  return (
    <div className="hidden fixed inset-0 top-0 lg:flex min-h-screen w-full flex-col items-center justify-center p-4 text-white z-50 pointer-events-none">
      {/* Caja Superior */}
      <div ref={topBoxRef} className="absolute left-0 right-0 top-0 h-28"></div>

      {/* Caja Inferior */}
      <div
        ref={bottomBoxRef}
        className="absolute bottom-0 left-0 right-0 h-28"
      ></div>

      {/* Caja Izquierda */}
      <div
        ref={leftBoxRef}
        className="absolute bottom-28 left-0 top-28 w-40"
      ></div>

      {/* Caja Derecha */}
      <div
        ref={rightBoxRef}
        className="absolute bottom-28 right-0 top-28 w-40"
      ></div>

      {/* Elemento Arrastrable */}
      <Toolbar
        ref={draggableRef}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={controls}
        position={currentBox}
      />
    </div>
  );
}
