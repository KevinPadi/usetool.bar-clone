import { useEffect, useRef, useState } from "react";
import Inbox from "./ui/Inbox";
import { useAnimationControls } from "motion/react";

export default function InboxContainer() {
  const controls = useAnimationControls();
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const draggableRef = useRef<HTMLDivElement>(null);

  // Almacena la última posición (x, y de traducción) donde el círculo fue soltado con éxito en una caja
  const [lastKnownPosition, setLastKnownPosition] = useState({ x: 0, y: 0 });

  // Calcula la posición inicial del círculo para que esté en el borde izquierdo de la Caja 1
  useEffect(() => {
    if (box1Ref.current && draggableRef.current) {
      const box1Rect = box1Ref.current.getBoundingClientRect();
      const draggableRect = draggableRef.current.getBoundingClientRect();
      const parentElement = draggableRef.current
        .offsetParent as HTMLElement | null;

      if (!parentElement) return; // Asegurarse de que el padre exista

      const parentRect = parentElement.getBoundingClientRect();
      const draggableWidth = draggableRect.width;
      const draggableHeight = draggableRect.height;

      // Calcula la posición deseada del centro del draggable en coordenadas del viewport
      const targetDraggableCenterX_viewport =
        box1Rect.left + draggableWidth / 2;
      const targetDraggableCenterY_viewport =
        box1Rect.top + box1Rect.height / 2;

      // Calcula la traducción necesaria para mover el centro del draggable a la posición deseada
      // La traducción es relativa al top-left del draggable cuando está en (0,0) de su padre absoluto
      const initialDraggableX =
        targetDraggableCenterX_viewport - parentRect.left - draggableWidth / 2;
      const initialDraggableY =
        targetDraggableCenterY_viewport - parentRect.top - draggableHeight / 2;

      // Anima el círculo a su posición inicial en la Caja 1 sin duración
      controls.start({
        x: initialDraggableX,
        y: initialDraggableY,
        transition: { duration: 0 },
      });

      // Establece esta como la última posición conocida
      setLastKnownPosition({ x: initialDraggableX, y: initialDraggableY });
    }
  }, [controls]); // Se ejecuta una vez al montar el componente

  // Helper function para verificar si dos rectángulos se superponen
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
    const box1Rect = box1Ref.current?.getBoundingClientRect();
    const box2Rect = box2Ref.current?.getBoundingClientRect();
    const parentElement = draggableRef.current
      .offsetParent as HTMLElement | null;

    if (!parentElement) return;

    const parentRect = parentElement.getBoundingClientRect();
    const draggableWidth = draggableRect.width;
    const draggableHeight = draggableRect.height;

    let targetBoxRect: DOMRect | null = null;
    let newX = lastKnownPosition.x; // Por defecto, vuelve a la última posición conocida
    let newY = lastKnownPosition.y; // Por defecto, vuelve a la última posición conocida
    let snappedToBox = false;
    let targetDraggableCenterX_viewport = 0;
    let targetDraggableCenterY_viewport = 0;

    if (box1Rect && isOverlapping(draggableRect, box1Rect)) {
      targetBoxRect = box1Rect;
      snappedToBox = true;
      // Para Caja 1 (izquierda), el centro del draggable debe estar a la mitad de su ancho desde el borde izquierdo de la caja
      targetDraggableCenterX_viewport = targetBoxRect.left + draggableWidth / 2;
    } else if (box2Rect && isOverlapping(draggableRect, box2Rect)) {
      targetBoxRect = box2Rect;
      snappedToBox = true;
      // Para Caja 2 (derecha), el centro del draggable debe estar a la mitad de su ancho desde el borde derecho de la caja
      targetDraggableCenterX_viewport =
        targetBoxRect.right - draggableWidth / 2;
    }

    if (snappedToBox && targetBoxRect) {
      // La posición Y sigue siendo el centro vertical de la caja
      targetDraggableCenterY_viewport =
        targetBoxRect.top + targetBoxRect.height / 2;

      // Calcula la traducción necesaria desde la posición inicial sin traducir del draggable
      newX =
        targetDraggableCenterX_viewport - parentRect.left - draggableWidth / 2;
      newY =
        targetDraggableCenterY_viewport - parentRect.top - draggableHeight / 2;

      // Actualiza la última posición conocida
      setLastKnownPosition({ x: newX, y: newY });
    }

    // Si no se soltó en una caja, newX y newY ya están configurados para volver a lastKnownPosition
    controls.start({
      x: newX,
      y: newY,
      transition: { type: "tween" }, // Revertido a spring para un snap más natural
    });
  };

  return (
    <div className="fixed top-0 right-0 min-h-screen w-full flex flex-col p-4 text-white z-50 pointer-events-none">
      <div className="flex-1 w-full flex">
        {/* Caja de Destino 1 */}
        <div ref={box1Ref} className="flex flex-1"></div>
        {/* Caja de Destino 2 */}
        <div ref={box2Ref} className="flex flex-1"></div>
      </div>
      {/* Elemento Arrastrable */}
      <Inbox
        draggableRef={draggableRef}
        controls={controls}
        handleDrag={handleDrag}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
}
