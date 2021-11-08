import { Canvas } from "@react-three/fiber";
import React, { createContext, Suspense, useContext, useEffect, useState } from "react";
import ExperienceCanvasContent from "./ExperienceCanvasContent";
import { defaultValues, IExperienceContextProps, useExperienceContext } from "./ExperienceProvider";
import LoadingOverlay from "./LoadingOverlay";

const BridgedContext = createContext<IExperienceContextProps>(defaultValues);
export const useBridgedExperienceContext = () => useContext(BridgedContext);

const CanvasFallback = ({ onFinish }) => {
  useEffect(() => {
    return () => {
      onFinish();
    }
  }, [])

  return null;
}

const ExperienceCanvas = () => {
  const experienceContext = useExperienceContext();
  const [experienceLoaded, setExperienceLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const onLoadExperience = () => {
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setExperienceLoaded(true), 1000);
    }, 2000);
  }

  return (
    <>
      <p>{JSON.stringify(experienceContext)}</p>
      <div className={`full-screen-absolute ${experienceLoaded ? 'z-[2]' : ''}`}>
        <Canvas>
          <Suspense fallback={<CanvasFallback onFinish={onLoadExperience} />}>
            <BridgedContext.Provider value={experienceContext}>
              <ExperienceCanvasContent />
            </BridgedContext.Provider>
          </Suspense>
        </Canvas>
      </div>
      {!experienceContext.debug &&
        <div className={`full-screen-absolute ${experienceLoaded ? 'z-[-1]' : 'z-50'}`}>
          {
            !experienceLoaded &&
            <div className={`transition-all duration-1000 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
              <LoadingOverlay />
            </div>
          }
        </div>
      }
    </>
  )
}

export default ExperienceCanvas
