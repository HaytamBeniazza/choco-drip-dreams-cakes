import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ImageManipulatorProps {
  imageUrl: string;
  width?: number;
  height?: number;
  effect?: 'ripple' | 'wave' | 'distort';
}

const ImageManipulator: React.FC<ImageManipulatorProps> = ({
  imageUrl,
  width = 400,
  height = 400,
  effect = 'ripple'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0xFAF8F7); // Light cream background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Texture loading
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      // Create geometry based on effect
      let geometry;
      switch (effect) {
        case 'ripple':
          geometry = new THREE.PlaneGeometry(4, 4, 32, 32);
          break;
        case 'wave':
          geometry = new THREE.PlaneGeometry(4, 4, 32, 32);
          break;
        case 'distort':
          geometry = new THREE.PlaneGeometry(4, 4, 32, 32);
          break;
        default:
          geometry = new THREE.PlaneGeometry(4, 4, 32, 32);
      }

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      meshRef.current = mesh;

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        const time = clockRef.current.getElapsedTime();

        if (meshRef.current) {
          switch (effect) {
            case 'ripple':
              const positions = meshRef.current.geometry.attributes.position;
              for (let i = 0; i < positions.count; i++) {
                const x = positions.getX(i);
                const y = positions.getY(i);
                positions.setZ(i, Math.sin(x * 2 + time) * 0.1);
              }
              positions.needsUpdate = true;
              break;
            case 'wave':
              meshRef.current.rotation.x = Math.sin(time) * 0.2;
              meshRef.current.rotation.y = Math.cos(time) * 0.2;
              break;
            case 'distort':
              const distortPositions = meshRef.current.geometry.attributes.position;
              for (let i = 0; i < distortPositions.count; i++) {
                const x = distortPositions.getX(i);
                const y = distortPositions.getY(i);
                distortPositions.setZ(i, Math.sin(x * 3 + time) * Math.cos(y * 3 + time) * 0.1);
              }
              distortPositions.needsUpdate = true;
              break;
          }
        }

        renderer.render(scene, camera);
      };

      animate();
    });

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, [imageUrl, width, height, effect]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        cursor: 'pointer'
      }}
    />
  );
};

export default ImageManipulator; 