 varying  vec2 vUvs;
 uniform float uTime;
 uniform vec4 color1;
 uniform vec4 color2;

void main() {
    
    gl_FragColor = mix(
        color1,
        color2,
       vUvs.x
    );
}
