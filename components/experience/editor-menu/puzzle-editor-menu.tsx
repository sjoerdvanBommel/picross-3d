import React from "react";
import { ActionButton, ActionButtonColor } from "./action-button";

interface IPuzzleEditorMenuProps {
  onChangeEditor: () => void;
}

const PuzzleEditorMenu = ({ onChangeEditor }: IPuzzleEditorMenuProps) => {

  return <aside className="flex justify-end">
    <div className="flex md:flex-col gap-6 mt-12 mr-8 md:mr-12">
      <ActionButton active={true} color={ActionButtonColor.Green} icon="pen-alt" mouseIcon={""} onClick={() => { }} />
      <ActionButton active={false} color={ActionButtonColor.Red} icon="eraser" mouseIcon={""} onClick={() => { }} />
      <ActionButton active={false} color={ActionButtonColor.Red} icon="eraser" mouseIcon={""} onClick={() => { }} />
      <ActionButton active={false} color={ActionButtonColor.Gray} icon="cubes" onClick={onChangeEditor} />
    </div>
  </aside>;
};

export default PuzzleEditorMenu;
