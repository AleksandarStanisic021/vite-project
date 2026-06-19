 varying  vec2 vUvs;
 uniform float uTime;

void main() {
    
    gl_FragColor = mix(
        vec4(1.0,0.0,0.0,1.0),
       vec4(0.0,1.0,0.0,1.0),
       vUvs.x
    );
}
