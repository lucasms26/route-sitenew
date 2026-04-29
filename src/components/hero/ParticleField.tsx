/**
 * ParticleField.tsx — WebGL Particle System with Perlin Noise Shader
 * 
 * Cria uma malha (grid) de partículas que são deformadas por um shader de Perlin Noise,
 * gerando ondas suaves que simulam um "fluxo de dados vivo".
 * 
 * Lógica Matemática:
 * - As partículas são posicionadas em uma grade 2D no espaço 3D
 * - Um noise function (simplex 3D) é aplicado para deslocar as posições Y
 * - O tempo (uniform uTime) cria a animação contínua das ondas
 * - A posição do mouse (uniform uMouse) cria uma distorção de lente (lens distortion)
 *   baseada na distância de cada partícula ao cursor, usando uma função gaussiana inversa
 */

import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

// Vertex shader: aplica Perlin Noise para deformar a malha de partículas
const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  
  attribute float aScale;
  
  varying float vAlpha;
  varying float vDistToMouse;
  
  // Simplex 3D Noise - função de ruído para gerar deformações orgânicas
  // Baseada no algoritmo de Stefan Gustavson (optimized)
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x2_ = x_ * ns.x + ns.yyyy;
    vec4 y2_ = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x2_) - abs(y2_);
    vec4 b0 = vec4(x2_.xy, y2_.xy);
    vec4 b1 = vec4(x2_.zw, y2_.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
  
  void main() {
    vec3 pos = position;
    
    // Aplicar Perlin Noise para ondas orgânicas
    // A frequência (0.3) controla o tamanho das ondas
    // A amplitude (1.5) controla a altura do deslocamento
    float noise = snoise(vec3(pos.x * 0.3, pos.z * 0.3, uTime * 0.15));
    pos.y += noise * 1.5;
    
    // Segunda camada de noise para mais complexidade (oitava)
    float noise2 = snoise(vec3(pos.x * 0.8, pos.z * 0.8, uTime * 0.25 + 100.0));
    pos.y += noise2 * 0.5;
    
    // Distorção do mouse - repulsão baseada em distância gaussiana
    // A distância é calculada no plano XZ (horizontal)
    vec2 mouseWorld = uMouse * 15.0;
    float dist = distance(pos.xz, mouseWorld);
    float mouseInfluence = exp(-dist * dist / (uMouseRadius * uMouseRadius));
    
    // Repelir partículas do mouse em Y e radialmente em XZ
    pos.y += mouseInfluence * 3.0;
    vec2 dir = normalize(pos.xz - mouseWorld + 0.001);
    pos.xz += dir * mouseInfluence * 2.0;
    
    vAlpha = 0.3 + noise * 0.3 + mouseInfluence * 0.5;
    vDistToMouse = mouseInfluence;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aScale * (2.0 + mouseInfluence * 4.0) * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader: renderiza cada partícula como um ponto circular com glow
const fragmentShader = `
  uniform vec3 uColor;
  uniform vec3 uAccentColor;
  
  varying float vAlpha;
  varying float vDistToMouse;
  
  void main() {
    // Criar forma circular suave (SDF de círculo)
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    
    // Glow suave nas bordas usando smoothstep
    float alpha = smoothstep(0.5, 0.1, dist) * vAlpha;
    
    // Misturar cor base (azul) com accent (amarelo) baseado na proximidade do mouse
    vec3 color = mix(uColor, uAccentColor, vDistToMouse * 0.8);
    
    gl_FragColor = vec4(color, alpha * 0.6);
  }
`;

const GRID_SIZE = 80;
const SPACING = 0.5;

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Normalizar coordenadas do mouse para [-1, 1]
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleScroll = useCallback(() => {
    scrollRef.current = window.scrollY;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // === Setup Three.js Scene ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 8, 15);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // === Criar Grid de Partículas ===
    const count = GRID_SIZE * GRID_SIZE;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const idx = (i * GRID_SIZE + j) * 3;
        positions[idx] = (i - GRID_SIZE / 2) * SPACING;
        positions[idx + 1] = 0;
        positions[idx + 2] = (j - GRID_SIZE / 2) * SPACING;
        scales[i * GRID_SIZE + j] = Math.random() * 0.5 + 0.5;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseRadius: { value: 4.0 },
        uColor: { value: new THREE.Color(0.2, 0.5, 0.9) },       // Azul neon
        uAccentColor: { value: new THREE.Color(1.0, 0.84, 0.0) }, // Amarelo dourado
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // === Neon Lines (Tube Lines simuladas com linhas) ===
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);

    // Criar linhas de luz neon que "fluem"
    for (let i = 0; i < 12; i++) {
      const points: THREE.Vector3[] = [];
      const startX = (Math.random() - 0.5) * 30;
      const startZ = (Math.random() - 0.5) * 20;
      
      for (let j = 0; j < 20; j++) {
        points.push(new THREE.Vector3(
          startX + j * (Math.random() * 2 - 1),
          Math.random() * 2 - 0.5,
          startZ + j * (Math.random() * 1.5 - 0.75)
        ));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(80));
      
      const lineMaterial = new THREE.LineBasicMaterial({
        color: i < 6 ? 0x3399ff : 0xffd700,
        transparent: true,
        opacity: 0.15 + Math.random() * 0.15,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      lineGroup.add(line);
    }

    // === Holographic Grid (Mesa Digital) ===
    const holoGroup = new THREE.Group();
    holoGroup.position.set(0, -1, 0);
    scene.add(holoGroup);

    // Grid de base
    const gridHelper = new THREE.GridHelper(20, 40, 0x1a5276, 0x0a2540);
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.3;
    holoGroup.add(gridHelper);

    // Wireframe de "holograma" - cubo e esfera
    const holoMat = new THREE.MeshBasicMaterial({ 
      color: 0x33bbff, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.15 
    });
    
    const holoCube = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), holoMat.clone());
    holoCube.position.set(-3, 1.5, -2);
    holoGroup.add(holoCube);

    const holoSphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1), 
      holoMat.clone()
    );
    holoSphere.position.set(3, 1.5, -1);
    holoGroup.add(holoSphere);

    // Ring de dados
    const holoRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.5, 0.02, 8, 64),
      new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.2 })
    );
    holoRing.position.set(0, 2, -3);
    holoRing.rotation.x = Math.PI / 4;
    holoGroup.add(holoRing);

    // === Event Listeners ===
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // === Animation Loop ===
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Atualizar uniforms do shader
      material.uniforms.uTime.value = elapsed;
      
      // Suavizar movimento do mouse (lerp)
      const targetMouse = new THREE.Vector2(mouseRef.current.x, mouseRef.current.y);
      material.uniforms.uMouse.value.lerp(targetMouse, 0.05);

      // Animar hologramas
      holoCube.rotation.y = elapsed * 0.3;
      holoCube.rotation.x = elapsed * 0.2;
      holoSphere.rotation.y = -elapsed * 0.4;
      holoRing.rotation.z = elapsed * 0.2;

      // Flicker effect nos hologramas (piscar aleatório)
      const flicker = Math.sin(elapsed * 15) * 0.5 + 0.5;
      (holoCube.material as THREE.MeshBasicMaterial).opacity = 0.1 + flicker * 0.08;
      (holoSphere.material as THREE.MeshBasicMaterial).opacity = 0.1 + Math.sin(elapsed * 12 + 2) * 0.04 + 0.04;

      // Animar opacidade das linhas neon (draw/erase effect)
      lineGroup.children.forEach((line, i) => {
        const mat = (line as THREE.Line).material as THREE.LineBasicMaterial;
        mat.opacity = 0.08 + Math.sin(elapsed * 0.5 + i * 1.2) * 0.1;
      });

      // Parallax Z no scroll
      const scrollFactor = scrollRef.current / window.innerHeight;
      scene.position.y = -scrollFactor * 5;
      scene.position.z = -scrollFactor * 3;
      
      // Fade out radial no scroll
      material.uniforms.uColor.value.setRGB(
        0.2 * (1 - scrollFactor * 0.8),
        0.5 * (1 - scrollFactor * 0.8),
        0.9 * (1 - scrollFactor * 0.8)
      );

      renderer.render(scene, camera);
    };

    animate();

    // === Resize Handler ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [handleMouseMove, handleScroll]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, hsl(216 64% 10%) 0%, hsl(216 64% 4%) 70%, #000 100%)' }}
    />
  );
}
