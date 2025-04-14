import { useEffect } from 'react';

export default function Loading() {
    useEffect(() => {
        // Define these variables outside the script's scope
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        console.log(isMobile, isIOS);
        
        // Define functions outside the script's scope
        function handleTap() {
            if (!isMobile) return;
            window.enterFullscreen();
        }
        
        function checkOrientation() {
            if (!isMobile) return;
            
            const portraitWarning = document.querySelector("#portrait-warning");
            const landscapePanel = document.querySelector("#landscape-panel");
            const doubleTapHeading = document.querySelector("#double-tap-heading");
            const isFullscreen = !!document.fullscreenElement;
            
            if (window.innerHeight > window.innerWidth) {
                portraitWarning.style.display = "flex";
                landscapePanel.style.display = "none";
                
                if (doubleTapHeading) {
                    if (isFullscreen) {
                        doubleTapHeading.classList.add('hidden');
                    } else {
                        doubleTapHeading.classList.remove('hidden');
                    }
                }
            } else {
                portraitWarning.style.display = "none";
                if (!isFullscreen) {
                    checkPanelVisibility();
                }
            }
        }
        
        function checkPanelVisibility() {
            if (!isMobile) return;
            
            const landscapePanel = document.querySelector("#landscape-panel");
            const isFullscreen = !!document.fullscreenElement;
            
            if (window.innerWidth > window.innerHeight && !isFullscreen) {
                landscapePanel.style.display = "flex";
            } else {
                landscapePanel.style.display = "none";
            }
        }
        
        // Run the Unity script when component mounts
        const script = document.createElement('script');
        script.src = "unity/Rummy_Built.loader.js";
        script.onload = () => {
            // After the loader script is loaded, execute the Unity initialization code
            const container = document.querySelector("#unity-container");
            const canvas = document.querySelector("#unity-canvas");
            const portraitWarning = document.querySelector("#portrait-warning");
            const landscapePanel = document.querySelector("#landscape-panel");
            const doubleTapHeading = document.querySelector("#double-tap-heading");
            let unityInstance = null;
            let isFullscreen = false;

            // Define the enterFullscreen function
            window.enterFullscreen = async function() {
                if (!isMobile) return;

                try {
                    const element = document.documentElement;

                    if (isIOS) {
                        document.body.style.position = 'fixed';
                        document.body.style.width = '100vw';
                        document.body.style.height = '100vh';
                        window.scrollTo(0, 0);
                        
                        const viewportMeta = document.querySelector('meta[name=viewport]');
                        if (viewportMeta) {
                            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
                        }
                    } else {
                        if (element.requestFullscreen) {
                            await element.requestFullscreen();
                        } else if (element.webkitRequestFullscreen) {
                            await element.webkitRequestFullscreen();
                        } else if (element.msRequestFullscreen) {
                            await element.msRequestFullscreen();
                        }
                    }

                    // Safely access screen.orientation
                    try {
                        const orientation = window.screen?.orientation;
                        if (orientation?.lock) {
                            await orientation.lock('landscape');
                        }
                    } catch (error) {
                        console.warn('Orientation lock failed:', error);
                    }

                    isFullscreen = true;
                    checkOrientation();
                    checkPanelVisibility();
                    return true;
                } catch (error) {
                    console.warn('Fullscreen request failed:', error);
                    return false;
                }
            };

            // Set up Unity configuration
            const buildUrl = "unity";
            const loaderUrl = buildUrl + "/Rummy_Built.loader.js";
            const config = {
                dataUrl: buildUrl + "/Rummy_Built.data",
                frameworkUrl: buildUrl + "/Rummy_Built.framework.js",
                codeUrl: buildUrl + "/Rummy_Built.wasm",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "FunavryTechnologies",
                productName: "Rummykub7777",
                productVersion: "1.92",
            };

            // Set up mobile-specific settings
            if (isMobile) {
                const meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
                document.getElementsByTagName('head')[0].appendChild(meta);
                container.className = "unity-mobile";
                canvas.className = "unity-mobile";

                document.querySelectorAll('.mobile-only').forEach(element => {
                    element.style.display = "none";
                });
            }

            // Create Unity instance
            const unityScript = document.createElement("script");
            unityScript.src = loaderUrl;
            unityScript.onload = () => {
                window.createUnityInstance(canvas, config, (progress) => {
                    // Progress handling if needed
                }).then((instance) => {
                    unityInstance = instance;
                    if (isMobile) {
                        checkOrientation();
                    }
                }).catch((message) => {
                    alert(message);
                });
            };
            document.body.appendChild(unityScript);

            // Set up mobile event listeners
            if (isMobile) {
                document.addEventListener('touchend', handleTap);
                document.addEventListener('click', handleTap);
                window.addEventListener('resize', checkOrientation);
                window.addEventListener('orientationchange', checkOrientation);
                
                if (!isIOS) {
                    document.addEventListener('fullscreenchange', () => {
                        isFullscreen = !!document.fullscreenElement;
                        checkOrientation();
                        checkPanelVisibility();
                    });
                }

                checkOrientation();
            }

            // Prevent touchmove on iOS
            document.addEventListener('touchmove', function(e) {
                if (isIOS) {
                    e.preventDefault();
                }
            }, { passive: false });
        };
        document.body.appendChild(script);

        // Clean up when component unmounts
        return () => {
            // Remove event listeners and scripts if needed
            if (isMobile) {
                document.removeEventListener('touchend', handleTap);
                document.removeEventListener('click', handleTap);
                window.removeEventListener('resize', checkOrientation);
                window.removeEventListener('orientationchange', checkOrientation);
                document.removeEventListener('touchmove', function(e) {
                    if (isIOS) {
                        e.preventDefault();
                    }
                });
            }
        };
    }, []);

    return (
        <div id="unity-container">
            <canvas id="unity-canvas"></canvas>
        </div>
    );
}