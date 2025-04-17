import React, { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import Loading from "../components/Loading";

export default function Game() {
    const navigate = useNavigate();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);
    const lastTap = useRef(0);  

    // Function to enter fullscreen mode and lock orientation
    const enterFullscreen = useCallback(async () => {
        const element = document.documentElement;
        try {
            if (element.requestFullscreen) {
                await element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                await element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                await element.msRequestFullscreen();
            }

            if (window.screen.orientation && window.screen.orientation.lock) {
                await window.screen.orientation.lock("landscape");
            }

            setIsFullscreen(true);
            setIsPortrait(window.innerHeight > window.innerWidth);
        } catch (error) {
            console.warn("Fullscreen request failed:", error);
        }
    }, []);

    // Handle double tap event
    const handleDoubleTap = useCallback(() => {
        const now = Date.now();
        if (now - lastTap.current < 300) { // 300ms threshold for double tap
            enterFullscreen();
        }
        lastTap.current = now;
    }, [enterFullscreen]);

    useEffect(() => {
        const phone = localStorage.getItem("phone");
        if (!phone) {
            navigate("/");
        }
    }, [navigate]);

    const {
        unityProvider,
        isLoaded,
        sendMessage,
        UNSAFE__detachAndUnloadImmediate,
    } = useUnityContext({
        loaderUrl: "./unity/Rummy_Built.loader.js",
        dataUrl: "./unity/Rummy_Built.data.unityweb",
        frameworkUrl: "./unity/Rummy_Built.framework.js",
        codeUrl: "./unity/Rummy_Built.wasm.unityweb",
    });
    console.log(unityProvider,isLoaded, sendMessage)
    useEffect(() => {
        if (isLoaded) {
            const query = new URLSearchParams(window.location.search);
            const code = query.get("code");
            if (code) {
                sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
                setTimeout(() => {
                    sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
                }, 3000);
            }
        }
    }, [isLoaded, sendMessage]);

    useEffect(() => {
        return () => {
            if (isLoaded) {
                UNSAFE__detachAndUnloadImmediate();
            }
        };
    }, [UNSAFE__detachAndUnloadImmediate, isLoaded]);

    // Function to check orientation and update state
    const checkOrientation = () => {
        setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Attach event listeners
    useEffect(() => {
        window.addEventListener("resize", checkOrientation);
        window.addEventListener("orientationchange", checkOrientation);

        return () => {
            window.removeEventListener("resize", checkOrientation);
            window.removeEventListener("orientationchange", checkOrientation);
        };
    }, []);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
    
        document.addEventListener("fullscreenchange", handleFullscreenChange);
    
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <div style={{ backgroundColor: "#21002e", height: "100vh", width: "100vw", position: "relative" }}>
            {!isLoaded && <Loading />}
            {/* Show rotate message only in portrait mode */}
            {isPortrait && (
                <div id="rotate-message"
                    onClick={handleDoubleTap} 
                    style={{
                        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                        background: "linear-gradient(147deg, rgba(25,0,39,1) 0%, rgba(83,0,111,1) 100%)",
                        color: "white", display: "flex", flexDirection: "column",
                        justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10000,
                        cursor: "pointer"
                    }}
                >
                    <h2>Please Rotate Your Device</h2>
                    <div style={{ fontSize: "48px", margin: "20px 0", transform: "rotate(-90deg)" }}>⟳</div>
                    {!isFullscreen && <h2>Double Tap to Rotate and Fullscreen</h2>}
                    <p>This game works best in landscape mode!</p>
                </div>
            )}
            <Unity unityProvider={unityProvider} />
            {/* Show fullscreen button only when in landscape and not fullscreen */}
            {!isFullscreen && !isPortrait && (
                <div onClick={handleDoubleTap}  style={{ fontSize: "48px", fontWeight:"12px",
                    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                    background: "linear-gradient(147deg, rgba(25,0,39,1) 0%, rgba(83,0,111,1) 100%)",
                    color: "white", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "center", textAlign: "center", zIndex: 10000,
                    cursor: "pointer"
                }}>
                    Double Tap to Fullscreen
                </div>
            )}
        </div>
    );
}
