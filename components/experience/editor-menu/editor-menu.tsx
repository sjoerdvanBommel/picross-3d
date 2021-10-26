import React, { useEffect, useRef, useState } from "react";
import FigureEditorMenu from "./figure-editor-menu";
import PuzzleEditorMenu from "./puzzle-editor-menu";

const EditorMenu = () => {
  const [isEditingFigure, setIsEditingFigure] = useState(true);

  const isFirstRun = useRef(true);

  const editPuzzle = () => setIsEditingFigure(false);
  const editFigure = () => setIsEditingFigure(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
  }, [isEditingFigure]);

  return <aside className="flex sm:flex-col gap-3 pb-4 px-4 sm:px-0 sm:gap-6 sm:mt-12 sm:mr-12 justify-between sm:justify-start sm:items-end">
    {isEditingFigure && <FigureEditorMenu onChangeEditor={editPuzzle}></FigureEditorMenu>}
    {!isEditingFigure && <PuzzleEditorMenu onChangeEditor={editFigure}></PuzzleEditorMenu>}
  </aside>;
};

export default EditorMenu