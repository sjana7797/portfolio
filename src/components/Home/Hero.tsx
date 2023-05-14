import { useEffect, useRef } from "react";
import * as THREE from "three";
import moonImg from "../../assets/images/moon.webp";
import sunImg from "../../assets/images/sun.webp";
import earthImg from "../../assets/images/earth.webp";
import spaceImg from "../../assets/images/stars_milky_way.webp";

function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const textureLoader = new THREE.TextureLoader();
    const moonTexture = textureLoader.load(moonImg);
    const sunTexture = textureLoader.load(sunImg);
    const earthTexture = textureLoader.load(earthImg);
    const spaceTexture = textureLoader.load(spaceImg);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    const moonGeometry = new THREE.SphereGeometry(0.8, 64, 64);

    const moonMaterial = new THREE.MeshStandardMaterial({
      map: moonTexture,
    });

    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);

    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
    });

    const pointLight = new THREE.PointLight(0xffffff, 1);
    const pointLightBack = new THREE.PointLight(0xffffff, 0.01);

    const lightHelper = new THREE.PointLightHelper(pointLight);
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);

    const sunGeometry = new THREE.SphereGeometry(3, 64, 64);

    const sunMaterial = new THREE.MeshBasicMaterial({
      map: sunTexture,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // const controls = new OrbitControls(camera, renderer.domElement);
    scene.add(moon);
    scene.add(sun);
    scene.add(earth);
    scene.add(pointLight);
    scene.add(pointLightBack);
    scene.add(lightHelper);
    scene.background = spaceTexture;

    sun.position.set(8, 5, 5);
    earth.position.set(2, 4, 2);
    moon.position.set(0.1, 1, 3);

    pointLight.position.set(15, 8, 5);
    pointLightBack.position.set(-15, -8, -5);

    camera.position.set(4, 4, 8);

    earth.rotateX(23);

    window.addEventListener("mousemove", (event) => {
      if (event.clientX <= window.innerWidth / 2) {
        moon.rotation.x += 0.01;
        moon.rotation.y -= 0.01;
        earth.rotation.x += 0.005;
        earth.rotation.y -= 0.005;
        sun.rotation.x += 0.001;
        sun.rotation.y -= 0.001;
      } else {
        moon.rotation.x -= 0.01;
        moon.rotation.y -= 0.01;
        earth.rotation.x -= 0.005;
        earth.rotation.y -= 0.005;
        sun.rotation.x -= 0.001;
        sun.rotation.y -= 0.001;
      }
      if (event.clientY <= window.innerHeight / 2) {
        moon.rotation.x -= 0.01;
        moon.rotation.y += 0.01;
        earth.rotation.x -= 0.005;
        earth.rotation.y += 0.005;
        sun.rotation.x -= 0.001;
        sun.rotation.y += 0.001;
      } else {
        moon.rotation.x -= 0.01;
        moon.rotation.y -= 0.01;
        earth.rotation.x -= 0.005;
        earth.rotation.y -= 0.005;
        sun.rotation.x -= 0.001;
        sun.rotation.y -= 0.001;
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      moon.rotation.y += 0.01;
      sun.rotation.y += 0.001;
      earth.rotation.y += 0.004;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return (
    <canvas className="w-screen h-screen max-h-full" ref={canvasRef}></canvas>
  );
}

export default Hero;
