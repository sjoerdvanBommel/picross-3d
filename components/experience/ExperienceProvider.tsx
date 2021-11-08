import { EditingType } from '@hooks/states/UseEditingType';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { FigureEditorAction } from './editor-menu/FigureEditorAction';
import { PuzzleEditorAction } from './editor-menu/PuzzleEditorAction';

export interface IExperienceContextProps {
  debug: boolean,
  setDebug: (_: boolean) => void,
  activeFigureAction: FigureEditorAction,
  setActiveFigureAction: (_: FigureEditorAction) => void,
  activePuzzleAction: PuzzleEditorAction,
  setActivePuzzleAction: (_: PuzzleEditorAction) => void,
  editingType: EditingType,
  setEditingType: (_: EditingType) => void
}

export const defaultValues = {
  debug: false,
  setDebug: (_: boolean) => { },
  activeFigureAction: FigureEditorAction.BUILDING,
  setActiveFigureAction: (_: FigureEditorAction) => { },
  activePuzzleAction: PuzzleEditorAction.ADDING_NUMBERS,
  setActivePuzzleAction: (_: PuzzleEditorAction) => { },
  editingType: EditingType.Constructing,
  setEditingType: (_: EditingType) => { }
}

const ExperienceContext = createContext<IExperienceContextProps>(defaultValues);

export const useExperienceContext = () => useContext(ExperienceContext);

type Props = {
  children: JSX.Element | JSX.Element[]
}

const ExperienceProvider = ({ children }: Props) => {
  const [debug, setDebug] = useState(false);
  const [activeFigureAction, setActiveFigureAction] = useState(FigureEditorAction.BUILDING);
  const [activePuzzleAction, setActivePuzzleAction] = useState(PuzzleEditorAction.ADDING_NUMBERS);
  const [editingType, setEditingType] = useState(EditingType.Constructing);

  useEffect(() => {
    setDebug(window.location.hash === '#debug');

    window.addEventListener('hashchange', function () {
      setDebug(window.location.hash === '#debug');
    });
  }, []);

  return (
    <ExperienceContext.Provider value={{ debug, setDebug, activeFigureAction: activeFigureAction, setActiveFigureAction, activePuzzleAction, setActivePuzzleAction, editingType, setEditingType }}>
      {children}
    </ExperienceContext.Provider>
  )
}

export default ExperienceProvider
