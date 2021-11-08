import { useState } from "react";

export enum EditingType {
  Constructing,
  Numbering,
  Solving
}

const useEditingType = () => {
  const [editingType, setEditingType] = useState(EditingType.Constructing);

  return { editingType, setEditingType };
}

export default useEditingType
