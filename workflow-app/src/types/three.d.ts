declare module '*.glb' {
    const content: any
    export default content
}

declare module '*.gltf' {
    const content: any
    export default content
}

declare namespace JSX {
    interface IntrinsicElements {
        primitive: any
        group: any
    }
} 