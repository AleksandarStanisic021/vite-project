 varying  vec2 vUvs;

void main() {
    
    vec3 color = vec3(vUvs.x,vUvs.y,1.0);
    gl_FragColor = vec4(1.0-color, 1.0);
}
