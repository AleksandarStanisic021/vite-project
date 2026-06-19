 varying  vec2 vUvs;
 uniform float uTime;

void main() {
    vec3 color = vec3(vUvs.x*uTime,vUvs.y,sin(uTime));
    gl_FragColor = vec4(color, 1.0);
}
