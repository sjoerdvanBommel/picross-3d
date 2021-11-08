import { useBridgedExperienceContext } from "@components/experience/ExperienceCanvas";
import { useExperienceContext } from "@components/experience/ExperienceProvider";
import { useEffect, useState } from "react";
import { Pane, TpChangeEvent } from "tweakpane";
import { ITweakableProperties } from "./ITweakableProperties";
import { ITweakParent } from "./ITweakParent";

let pane: ITweakParent | null;

type Values<T> = {
  [value in keyof T]: any
}

export const useTweakableProperties = <T extends ITweakableProperties>(properties: T, folderPath?: string, bridged?: boolean): Values<T> => {
  const [tweakableProperties, setTweakableProperties] = useState(properties);

  let debug: boolean;
  if (bridged === true) {
    debug = useBridgedExperienceContext().debug;
  } else {
    debug = useExperienceContext().debug;
  }

  useEffect(() => {
    if (!debug) {
      removePane();
      return;
    }

    const parent = getOrCreateParent();

    for (const prop in tweakableProperties) {
      const tweakValues = tweakableProperties[prop];
      parent.tweaks = parent.tweaks ?? [];

      if (!parent.tweaks.find(x => x.label === prop)) {
        parent.tweaks.push(parent.addInput(tweakValues, 'value', { ...tweakValues, label: prop }).on('change', (ev: TpChangeEvent) => {
          tweakValues.onUpdate?.();
          setTweakableProperties({ ...tweakableProperties, [prop]: { ...tweakValues, value: ev.value } });
        }));
      }
    }

    return removeTweaks;
  }, [debug]);

  const removeTweaks = () => {
    const parent = getOrCreateParent();
    parent.tweaks = parent.tweaks ?? [];

    for (const prop in tweakableProperties) {
      const currentTweak = parent.tweaks.find(x => x.label === prop);
      if (currentTweak) {
        currentTweak.dispose();
        parent.tweaks = parent.tweaks.filter(x => x.label !== prop);
        if (parent.tweaks.length === 0 && !parent.folders?.length) {
          parent.parent!.folders = parent.parent!.folders!.filter(x => x.title !== folderPath!.split('.')[folderPath!.split('.').length - 1]);
          parent.dispose();
        }
      }
    }
  };

  const removePane = () => {
    if (pane) {
      pane.folders = [];
      pane.tweaks = [];
      pane.dispose();
      pane = null;
    }
  };

  const getOrCreateParent = (): ITweakParent => {
    pane = pane ?? new Pane() as any;
    let parent: ITweakParent = pane!;

    if (folderPath) {
      let restOfPath = folderPath;
      do {
        let [currentFolderTitle, ...rest] = restOfPath.split('.');
        restOfPath = rest.join('.');

        parent.folders = parent.folders ?? [];

        let existingFolder = parent.folders.find(x => x.title === currentFolderTitle);
        if (!existingFolder) {
          parent.folders.push(parent.addFolder({ title: currentFolderTitle }));
        }

        const newParent = parent.folders.find(x => x.title === currentFolderTitle);
        if (newParent) {
          newParent.parent = parent;
          parent = newParent;
        }
      } while (restOfPath);
    }

    return parent;
  };

  const flattenValues = () => {
    const res: Values<T> = {} as any;
    for (let key in tweakableProperties) {
      res[key] = tweakableProperties[key].value;
    }
    return res;
  }

  return flattenValues();
}