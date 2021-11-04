import Link from "next/link";
import React from "react";
import { FaFlagCheckered, FaHammer, FaPalette, FaTrash } from "react-icons/fa";
import { useExperienceContext } from "../ExperienceProvider";
import { ActionButton, ActionButtonColor } from "./action-button";
import { FigureEditorAction } from "./FigureEditorAction";

const FigureEditorMenu = () => {
  const { activeFigureAction, setActiveFigureAction } = useExperienceContext();

  const setBuilding = () => setActiveFigureAction(FigureEditorAction.BUILDING);
  const setDestroying = () => setActiveFigureAction(FigureEditorAction.DESTROYING);
  const setCustomizing = () => setActiveFigureAction(FigureEditorAction.CUSTOMIZING);

  return <aside className="editor-menu">
    <div className="editor-sub-menu">
      <ActionButton
        active={activeFigureAction === FigureEditorAction.BUILDING}
        color={ActionButtonColor.Green}
        icon={<FaHammer className="action-icon-button" />}
        mouseIcon={activeFigureAction.getMouseIcon(FigureEditorAction.BUILDING)}
        onClick={setBuilding}
      />
      <ActionButton
        active={activeFigureAction === FigureEditorAction.CUSTOMIZING}
        color={ActionButtonColor.Blue}
        icon={<FaPalette className="action-icon-button" />}
        mouseIcon={activeFigureAction.getMouseIcon(FigureEditorAction.CUSTOMIZING)}
        onClick={setCustomizing}
      />
      <ActionButton
        active={activeFigureAction === FigureEditorAction.DESTROYING}
        color={ActionButtonColor.Red}
        icon={<FaTrash className="action-icon-button" />}
        mouseIcon={activeFigureAction.getMouseIcon(FigureEditorAction.DESTROYING)}
        onClick={setDestroying}
      />
    </div>
    <div className="editor-sub-menu justify-end">
      <Link href="/edit-puzzle" passHref>
        <div>
          <ActionButton
            active={false}
            color={ActionButtonColor.Gray}
            icon={<FaFlagCheckered className="action-icon-button" />}
            onClick={() => { }}
          />
        </div>
      </Link>
    </div>
  </aside>;
};

export default FigureEditorMenu;
