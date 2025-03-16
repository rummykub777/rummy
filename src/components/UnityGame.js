import React, { useEffect, useRef, useState } from "react";

const UnityGame = () => {
  const canvasRef = useRef(null);
  const [loadingStatus, setLoadingStatus] = useState("Not started");
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUnityGame = async () => {
      try {
        setLoadingStatus("Creating loader script");

        // Create the Unity loader script
        const script = document.createElement("script");
        script.src = "/Rummi_Build/loader.js"; // Note the leading slash
        script.async = true;

        // Once the loader script is loaded, create Unity instance
        script.onload = () => {
          setLoadingStatus("Loader script loaded, initializing Unity");

          if (window.createUnityInstance) {
            window
              .createUnityInstance(canvasRef.current, {
                dataUrl: "/Rummi_Build/Rummi_Build.data.unityweb",
                frameworkUrl: "/Rummi_Build/Rummi_Build.framework.js.unityweb",
                codeUrl: "/Rummi_Build/Rummi_Build.wasm.unityweb",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "DefaultCompany",
                productName: "Rummi",
                productVersion: "1.0",
              })
              .then((unityInstance) => {
                setLoadingStatus("Unity game loaded successfully");
                window.unityInstance = unityInstance;
              })
              .catch((error) => {
                console.error("Unity loading error:", error);
                setError(`Unity loading error: ${error.message}`);
                setLoadingStatus("Failed to load Unity game");
              });
          } else {
            setError("createUnityInstance not found");
            setLoadingStatus("Failed to initialize Unity");
          }
        };

        script.onerror = (e) => {
          setError(`Failed to load loader.js: ${e.message}`);
          setLoadingStatus("Failed to load loader script");
        };

        document.body.appendChild(script);

        // Cleanup function
        return () => {
          if (window.unityInstance) {
            window.unityInstance.Quit();
          }
          document.body.removeChild(script);
        };
      } catch (error) {
        console.error("Error loading Unity game:", error);
        setError(`Error loading Unity game: ${error.message}`);
        setLoadingStatus("Failed due to error");
      }
    };

    loadUnityGame();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="fixed bottom-4 left-4 text-white bg-black/50 p-2 rounded">
        Status: {loadingStatus}
        {error && <div className="text-red-500">Error: {error}</div>}
      </div>
    </div>
  );
};

export default UnityGame;
