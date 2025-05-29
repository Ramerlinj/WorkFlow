import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group, Mesh } from 'three'

interface WorkspaceSceneProps {
    isHovered: boolean
}

function Particles() {
    const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => i), [])
    const groupRef = useRef<Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            particles.forEach((i) => {
                const mesh = groupRef.current?.children[i] as Mesh
                if (mesh) {
                    mesh.position.x = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
                    mesh.position.y = Math.cos(state.clock.elapsedTime * 3 + i) * 0.3
                    mesh.position.z = Math.sin(state.clock.elapsedTime + i) * 0.2
                }
            })
        }
    })

    return (
        <group ref={groupRef} position={[0, 0.5, 0]}>
            {particles.map((i) => (
                <mesh key={i} scale={0.02}>
                    <sphereGeometry />
                    <meshStandardMaterial
                        color="#38BDF8"
                        emissive="#38BDF8"
                        emissiveIntensity={0.8}
                        metalness={0.9}
                        roughness={0.1}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}
        </group>
    )
}

export function WorkspaceScene({ isHovered }: WorkspaceSceneProps) {
    const group = useRef<Group>(null)

    useFrame((state) => {
        if (group.current) {
            const targetRotationY = isHovered ? Math.PI * 0.1 : 0
            group.current.rotation.y += (targetRotationY - group.current.rotation.y) * 0.1
            group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.03
        }
    })

    return (
        <group ref={group} dispose={null}>
            {/* Escritorio */}
            <mesh
                castShadow
                receiveShadow
                position={[0, -0.5, 0]}
                scale={[2.2, 0.08, 1.2]}
            >
                <boxGeometry />
                <meshStandardMaterial color="#F8FAFC" metalness={0.5} roughness={0.2} />
            </mesh>

            {/* Monitor */}
            <group position={[0, 0.2, -0.3]}>
                <mesh castShadow receiveShadow scale={[1.4, 0.9, 0.05]}>
                    <boxGeometry />
                    <meshStandardMaterial color="#E2E8F0" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0, 0.01]} scale={[1.3, 0.8, 0.01]}>
                    <boxGeometry />
                    <meshStandardMaterial
                        color="#38BDF8"
                        emissive="#38BDF8"
                        emissiveIntensity={0.6}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            </group>

            {/* Teclado */}
            <mesh
                castShadow
                receiveShadow
                position={[0, -0.42, 0]}
                scale={[0.8, 0.05, 0.3]}
            >
                <boxGeometry />
                <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Mouse */}
            <mesh
                castShadow
                receiveShadow
                position={[0.5, -0.42, 0]}
                scale={[0.15, 0.05, 0.2]}
            >
                <boxGeometry />
                <meshStandardMaterial color="#CBD5E1" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Porta lápices */}
            <mesh
                castShadow
                receiveShadow
                position={[-0.8, -0.3, -0.2]}
                scale={[0.12, 0.25, 0.12]}
            >
                <cylinderGeometry />
                <meshStandardMaterial
                    color="#7DD3FC"
                    metalness={0.6}
                    roughness={0.3}
                />
            </mesh>

            {/* Lámpara */}
            <group position={[0.8, 0, -0.3]}>
                <mesh
                    castShadow
                    receiveShadow
                    scale={[0.12, 0.45, 0.12]}
                    position={[0, -0.2, 0]}
                >
                    <cylinderGeometry />
                    <meshStandardMaterial
                        color="#E2E8F0"
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                <mesh
                    castShadow
                    receiveShadow
                    scale={[0.25, 0.12, 0.25]}
                    position={[0, 0.1, 0]}
                >
                    <coneGeometry />
                    <meshStandardMaterial
                        color="#38BDF8"
                        emissive="#38BDF8"
                        emissiveIntensity={isHovered ? 1 : 0.5}
                        metalness={0.9}
                        roughness={0.1}
                    />
                </mesh>
            </group>

            {/* Efectos de partículas cuando hay hover */}
            {isHovered && <Particles />}
        </group>
    )
} 