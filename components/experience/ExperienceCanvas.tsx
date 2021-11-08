import { useContextBridge } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import ExperienceCanvasContent from "./ExperienceCanvasContent";
import { ExperienceContext, useExperienceContext } from "./ExperienceProvider";
import LoadingOverlay from "./LoadingOverlay";

const CanvasFallback = ({ onFinish }: any) => {
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
  const ContextBridge = useContextBridge(ExperienceContext);

  const onLoadExperience = () => {
    setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setExperienceLoaded(true), 1000);
    }, 2000);
  }

  return (
    <>
      <div className={`full-screen-absolute ${experienceLoaded ? 'z-[2]' : ''}`}>
        <Canvas>
          <Suspense fallback={<CanvasFallback onFinish={onLoadExperience} />}>
            <ContextBridge>
              <ExperienceCanvasContent />
            </ContextBridge>
          </Suspense>
        </Canvas>
      </div>
      {!experienceContext.isDebugMode &&
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
