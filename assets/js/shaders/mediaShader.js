
const mediaShader =
`
#ifdef GL_ES
precision highp float;
#endif

#define TAU 6.28318530718

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;
uniform vec2 uDimensions;
uniform float uScale;
uniform float uDirection;
uniform float uTime;

void main() {
  vec2 uv = vTextureCoord;
  vec2 pixelCoord = vTextureCoord * uDimensions.xy;

	uv.y += sin(pixelCoord.x / 200. * uDirection )/10.0 * uScale;

	vec4 color = texture2D(uSampler, uv);
  vec4 bwColor = vec4(vec3(color.r+color.g+color.b)/3.0, color.a);

	gl_FragColor = color*(1.-uScale) + bwColor * uScale ;
}`
export default mediaShader
