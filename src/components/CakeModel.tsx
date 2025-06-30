import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface CakeModelProps {
  imageUrl: string;
  color?: string;
  rotationSpeed?: number;
}

// This component creates a 3D cake model using Three.js directly
// We're using this approach since we can't install packages with the PowerShell restrictions
const CakeModel: React.FC<CakeModelProps> = ({ 
  imageUrl, 
  color = '#8B4513', // Default brown color
  rotationSpeed = 0.01 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cakeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75, 
      mountRef.current.clientWidth / mountRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true // Transparent background
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);
    
    // Create lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load texture from the provided image URL
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      // Create cake geometry (cylinder for cake base and hemisphere for top)
      const cakeBaseGeometry = new THREE.CylinderGeometry(2, 2, 1.5, 32);
      const cakeTopGeometry = new THREE.SphereGeometry(2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2);
      
      // Create materials - we'll use the texture on top and a solid color for sides
      const topMaterial = new THREE.MeshStandardMaterial({ 
        map: texture,
        roughness: 0.3,
        metalness: 0.2
      });
      
      const sideMaterial = new THREE.MeshStandardMaterial({ 
        color: new THREE.Color(color),
        roughness: 0.5,
        metalness: 0.1
      });

      // Create cake base
      const cakeBase = new THREE.Mesh(cakeBaseGeometry, sideMaterial);
      cakeBase.position.y = -1;
      
      // Create cake top
      const cakeTop = new THREE.Mesh(cakeTopGeometry, topMaterial);
      cakeTop.position.y = 0.5;

      // Group the parts together
      const cakeGroup = new THREE.Group();
      cakeGroup.add(cakeBase);
      cakeGroup.add(cakeTop);
      
      // Add drip effect (small spheres around the edge)
      const dripGeometry = new THREE.SphereGeometry(0.2, 16, 16);
      const dripMaterial = new THREE.MeshStandardMaterial({
        color: 0x3A2618, // Chocolate color
        roughness: 0.3,
        metalness: 0.5
      });
      
      // Add drips around the edge
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 / 12) * i;
        const x = Math.cos(angle) * 2;
        const z = Math.sin(angle) * 2;
        
        const drip = new THREE.Mesh(dripGeometry, dripMaterial);
        drip.position.set(x, 0, z);
        drip.scale.y = 1 + Math.random(); // Random height for each drip
        cakeGroup.add(drip);
      }
      
      // Add to scene and save reference
      scene.add(cakeGroup);
      cakeRef.current = cakeGroup as THREE.Mesh;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (cakeRef.current) {
        cakeRef.current.rotation.y += rotationSpeed;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [imageUrl, color, rotationSpeed]);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100%', 
        height: '200px',
        borderRadius: '50%',
        overflow: 'hidden',
        margin: '0 auto',
        cursor: 'pointer'
      }}
    />
  );
};

export default CakeModel; 