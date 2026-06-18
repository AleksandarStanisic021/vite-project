
varying vec2 vUv;
uniform float uTime;

void main() {
    // Dinamična promena boje u funkciji vremena i UV koordinata podloge
    vec3 color = vec3(vUv.x, sin(uTime) * 0.5 + 0.5, vUv.y);
    gl_FragColor = vec4(color, 1.0);
}
    