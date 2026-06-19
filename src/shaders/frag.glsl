 varying  vec2 vUvs;

 uniform vec4 color1;
 uniform vec4 color2;

uniform sampler2D diffuse;

void main() {
    
    gl_FragColor = texture2D(diffuse,vUvs);
}
