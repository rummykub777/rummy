export default function Loading() {
    return (<div className="page-loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-wedges">
            <g transform="translate(50,50)">
                <g transform="scale(1)">
                    <g transform="translate(-50,-50)">
                        <g transform="rotate(239.504 50 50)">
                            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.75s" begin="0s" repeatCount="indefinite" />
                            <path ng-attr-fillopacity="{{config.opacity}}" ng-attr-fill="{{config.c1}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" fillOpacity="0.8" fill="#fdb813" />
                        </g>
                        <g transform="rotate(359.628 50.0024 50.0024)">
                            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite" />
                            <path ng-attr-fillopacity="{{config.opacity}}" ng-attr-fill="{{config.c2}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(90 50 50)" fillOpacity="0.8" fill="#fdb813" />
                        </g>
                        <g transform="rotate(119.752 50 50)">
                            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite" />
                            <path ng-attr-fillopacity="{{config.opacity}}" ng-attr-fill="{{config.c3}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(180 50 50)" fillOpacity="0.8" fill="#52006f" />
                        </g>
                        <g transform="rotate(239.876 50 50)">
                            <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="3s" begin="0s" repeatCount="indefinite" />
                            <path ng-attr-fillopacity="{{config.opacity}}" ng-attr-fill="{{config.c4}}" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(270 50 50)" fillOpacity="0.8" fill="#52006f" />
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    </div>)
}