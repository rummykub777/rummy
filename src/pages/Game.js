/* eslint-disable react-hooks/exhaustive-deps */
import React from "react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import Loading from "../components/Loading";

export default function Game() {
    const navigate = useNavigate()

    useEffect(() => {
        const phone = localStorage.getItem("phone")
        if (!phone) {
            navigate("/")
        }
    }, [])

    const { unityProvider, isLoaded, sendMessage, UNSAFE__detachAndUnloadImmediate } = useUnityContext({
        loaderUrl: "./unity/my.loader.js",
        dataUrl: "./unity/my.data.unityweb",
        frameworkUrl: "./unity/my.framework.js.unityweb",
        codeUrl: "./unity/my.wasm.unityweb",
    });

    useEffect(() => {
        if (isLoaded) {
            const query = new URLSearchParams(window.location.search);
            const code = query.get('code')
            sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
            setTimeout(() => {
                sendMessage("WebCommunication", "CreatePublicRoom", "" + code);
            }, 3000);
        }
    }, [isLoaded])

    useEffect(function () {
        return async function () {
            if (isLoaded) {
                await UNSAFE__detachAndUnloadImmediate()
            }
        };
    }, [UNSAFE__detachAndUnloadImmediate]);

    return (<div style={{ backgroundColor: "#21002e" }}>
        {!isLoaded && <Loading />}
        <Unity unityProvider={unityProvider} />
    </div>);
}
