import { Canvas } from '@react-three/fiber';
import { Environment, Float, Lightformer, AdaptiveDpr } from '@react-three/drei';
import { Planet } from './Planet';

// Split into its own lazy chunk (three.js + the model) so it never blocks first paint / LCP.
const PlanetScene = ({ running, isMobile, onReady }) => (
    <Canvas
        frameloop={running ? 'always' : 'never'}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        onCreated={onReady}
        aria-hidden="true"
    >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.5} />
        <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
        </Float>

        <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer form="circle" intensity={2} scale={10} position={[0, 3, 1]} />
                <Lightformer form="circle" intensity={2} scale={10} position={[-5, -1, -1]} />
                <Lightformer form="circle" intensity={2} scale={16} position={[10, 1, 0]} />
            </group>
        </Environment>
    </Canvas>
);

export default PlanetScene;
