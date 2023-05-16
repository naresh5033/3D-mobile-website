import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  CanvasSnipperPlugin,
  mobileAndTabletCheck,

  // Color, // Import THREE.js internals
  // Texture, // Import THREE.js internals
} from "webgi";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

// lets reg the plugin, this will enable the obj animated and placed in the right place as we click the learn more
gsap.registerPlugin(ScrollTrigger);

const WebGiViewer = forwardRef((props, ref) => {
  {
    const canRef = useRef();

    const [viewerRef, setViewerRef] = useState("null");
    const [targetRef, setTargetRef] = useState("null");
    const [cameraRef, setCameraRef] = useState("null");
    const [positionRef, setPositionRef] = useState("null"); // now we can use this vars to update the position of our camera in our gsap
    const [PreviewMode, setPreviewMode] = useState(false);
    const [isMobile, setIsMobile] = useState(null);
    const canvasContainerRef = useRef(null);
    //inside of this hook we can define what is the fn that we gon trigger from the parent comp(app.js)
    //  is a React Hook that lets you customize the handle exposed as a ref
    useImperativeHandle(ref, () => ({
      triggerPreview() {
        setPreviewMode(true);
        canvasContainerRef.current.style.pointerEvents = "all"; // this will remove the pointer event rule that we set earlier
        props.contentRef.current.style.opacity = "0";
        gsap.to(positionRef, {
          x: 13.04,
          y: -2.01,
          z: 2.29,
          duration: 2,
          onUpdate: () => {
            viewerRef.setDirty();
            cameraRef.positionTargetUpdated(true);
          },
        });
        // lly for th target ref
        gsap.to(targetRef, { x: 0.11, y: 0.0, z: 0.0, duration: 2 }); // now we can be able to call this fn from the parent (app.jsf)
        // we wana set our model to enable rotate contrls
        viewerRef.scene.activeCamera.setCameraOptions({
          controlsEnabled: true,
        });
      },
    }));

    const memoizedScrollAnimation = useCallback(
      (position, target, isMobile, onUpdate) => {
        if (position && target && onUpdate) {
          scrollAnimation(position, target, isMobile, onUpdate);
        }
      },
      []
    );

    //since we gon ve lota re rendering in this fn, so lets cache this using the usecallback

    // the setupViewer is the code from the webGi starter template(index.ts)
    const setupViewer = useCallback(async () => {
      // Initialize the viewer
      const viewer = new ViewerApp({
        canvas: canRef.current,
      });

      setViewerRef(viewer);
      const isMobileOrTablet = mobileAndTabletCheck();
      setIsMobile(isMobileOrTablet);
      // Add some plugins
      const manager = await viewer.addPlugin(AssetManagerPlugin);

      //lets add the camera to get the position and the target of our obj
      const camera = viewer.scene.activeCamera;
      const position = camera.position;
      const target = camera.target;
      setCameraRef(camera);
      setPositionRef(position);
      setTargetRef(target);
      // Add plugins individually.
      await viewer.addPlugin(GBufferPlugin);
      await viewer.addPlugin(new ProgressivePlugin(32));
      await viewer.addPlugin(new TonemapPlugin(true));
      await viewer.addPlugin(GammaCorrectionPlugin);
      await viewer.addPlugin(SSRPlugin);
      await viewer.addPlugin(SSAOPlugin);

      await viewer.addPlugin(BloomPlugin);
      // await viewer.addPlugin(TemporalAAPlugin)
      // await viewer.addPlugin(AnisotropyPlugin)

      // or use this to add all main ones at once.
      // await addBasePlugins(viewer);

      // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
      // await viewer.addPlugin(CanvasSnipperPlugin);

      // This must be called once after all plugins are added.
      viewer.renderer.refreshPipeline();

      await manager.addFromPath("scene-black.glb");
      viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

      //set the controls enable to, so the use can't rotate the obj
      viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

      //lets check for the sm dev
      if (isMobileOrTablet) {
        position.set(-16.7, 1.17, 11.7);
        target.set(0, 1.37, 0);
        props.contentRef.current.className = "mobile-or-tablet"; // we'll use the calss to hide the elems
      }
      window.scroll(0, 0); //top and left , so its fixed on the top initial

      let onUpdate = () => {
        needsUpdate = true;
        viewer.setDirty(); // basically saying that camera and the viewer needs to be updated
      };
      //lets add the event listener for the position changes
      let needsUpdate = true;
      viewer.addEventListener("preFrame", () => {
        if (needsUpdate) {
          camera.positionTargetUpdated(true);
          needsUpdate = false;
        }
      });

      memoizedScrollAnimation(position, target, isMobileOrTablet, onUpdate);

      // Load an environment map if not set in the glb file
      // await viewer.scene.setEnvironment(
      //     await manager.importer!.importSinglePath<ITexture>(
      //         "./assets/environment.hdr"
      //     )
      // );
    }, []);

    useEffect(() => {
      setupViewer();
    }, []);

    const handleExit = useCallback(() => {
      canvasContainerRef.current.style.pointerEvents = "none"; // this will remove the pointer event rule that we set earlier
      props.contentRef.current.style.opacity = "1";
      viewerRef.scene.activeCamera.setCameraOptions({
        controlsEnabled: false,
      });
      setPreviewMode(false);

      //once we re done with the preview mode, we need to set the model back to its original position
      gsap.to(positionRef, {
        x: !isMobile ? 1.56 : 9.36,
        y: !isMobile ? 5.0 : 10.95,
        z: !isMobile ? 0.01 : 0.09, // the cam position of the model that we grab from webgi viewer
        scrollTrigger: {
          trigger: ".display-section", // the obj  triggers in the sound sec (dom elem)
          start: "top bottom", // when the top of the sound sec hits the bottom of the vp
          end: "top top", //end when the top of the sound section and top of vp.
          scrub: 2, //for the transition
          immediateRender: false, //we re not gon render until this animation is triggered.
        },
        onUpdate: () => {
          viewerRef.setDirty();
          cameraRef.positionTargetUpdated(true);
        },
      });
      // lly lets do it for the target as well
      gsap.to(targetRef, {
        x: !isMobile ? -0.55 : -1.62,
        y: !isMobile ? 0.32 : 0.02,
        z: !isMobile ? 0.0 : -0.06, // the cam position of the model that we grab from webgi viewer
        scrollTrigger: {
          opacity: 0,
          trigger: ".display-section", // the obj  triggers in the sound sec (dom elem)
          start: "top bottom", // when the top of the sound sec hits the bottom of the vp
          end: "top top", //end when the top of the sound section and top of vp.
          scrub: 2, //for the transition
          immediateRender: false, //we re not gon render until this animation is triggered.
        },
      });
    }, [canvasContainerRef, viewerRef, positionRef, cameraRef, targetRef]);
    return (
      <div ref={canvasContainerRef} id="webgi-canvas-container">
        <canvas id="webgi-canvas" ref={canRef} />
        {PreviewMode && (
          <button className="button" onClick={handleExit}>
            Exit
          </button>
        )}
      </div>
    );
  }
});
export default WebGiViewer;
