import Link from "next/link";
import React from "react";
import { FaCubes, FaEraser, FaPenAlt } from "react-icons/fa";
import { useExperienceContext } from "../ExperienceProvider";
import { ActionButton, ActionButtonColor } from "./action-button";
import { PuzzleEditorAction } from "./PuzzleEditorAction";

const PuzzleEditorMenu = () => {
  const { activePuzzleAction, setActivePuzzleAction } = useExperienceContext();

  const setAddingNumbers = () => setActivePuzzleAction(PuzzleEditorAction.ADDING_NUMBERS);
  const setRemovingNumbers = () => setActivePuzzleAction(PuzzleEditorAction.REMOVING_NUMBERS);

  return (
    <>
      <aside className="editor-menu">
        <div className="editor-sub-menu">
          <ActionButton
            active={activePuzzleAction === PuzzleEditorAction.ADDING_NUMBERS}
            color={ActionButtonColor.Green}
            icon={<FaPenAlt className="action-icon-button" />}
            mouseIcon={activePuzzleAction.getMouseIcon(PuzzleEditorAction.ADDING_NUMBERS)}
            onClick={setAddingNumbers}
          />
          <ActionButton
            active={activePuzzleAction === PuzzleEditorAction.REMOVING_NUMBERS}
            color={ActionButtonColor.Red}
            icon={<FaEraser className="action-icon-button" />}
            mouseIcon={activePuzzleAction.getMouseIcon(PuzzleEditorAction.REMOVING_NUMBERS)}
            onClick={setRemovingNumbers}
          />
        </div>
        <div className="editor-sub-menu">
          <Link href="/edit-figure">
            <ActionButton
              active={false}
              color={ActionButtonColor.Gray}
              icon={<FaCubes className="action-icon-button" />}
              onClick={() => { }}
            />
          </Link>
        </div>
      </aside>
    </>
  );
};

export default PuzzleEditorMenu;
