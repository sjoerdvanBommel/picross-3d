import React from "react";
import { ActionButton, ActionButtonColor } from "./action-button";

interface IFigureEditorMenuProps {
  onChangeEditor: () => void;
}

const FigureEditorMenu = ({ onChangeEditor }: IFigureEditorMenuProps) => {

  return <>
    <ActionButton active={true} color={ActionButtonColor.Green} icon="hammer" mouseIcon={""} onClick={() => { }} />
    <ActionButton active={false} color={ActionButtonColor.Red} icon="trash" mouseIcon={""} onClick={() => { }} />
    <ActionButton active={false} color={ActionButtonColor.Blue} icon="palette" mouseIcon={""} onClick={() => { }} />
    <ActionButton active={false} color={ActionButtonColor.Gray} icon="flag-checkered" onClick={onChangeEditor} />
  </>;
};

export default FigureEditorMenu;
