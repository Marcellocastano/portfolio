import { Html } from '@react-three/drei';
import './HoverLabel.css';

type Vec3 = [number, number, number];

/** Etichetta DOM agganciata a un punto della scena: dice cosa succede al clic. */
export function HoverLabel({ position, text }: { position: Vec3; text: string }) {
  return (
    <Html position={position} center zIndexRange={[20, 0]} pointerEvents="none">
      <span className="world-label">{text}</span>
    </Html>
  );
}
