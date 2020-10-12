
const coverShader =
`
#ifdef GL_ES
precision highp float;
#endif

#define TAU 6.28318530718

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec2 dimensions;
uniform float uTime;
uniform float uOpacity;
uniform float uScale;

void main() {
  vec2 uv = vTextureCoord;
  vec2 pixelCoord = vTextureCoord * filterArea.xy;
  vec2 normalizedCoord = pixelCoord / dimensions;

	uv.x += sin(pixelCoord.y / 30. +uTime / 3.)/15.0 * uScale;
	uv.y += sin(pixelCoord.x / 50. +uTime / 4.)/20.0 * uScale;

	vec4 color = texture2D(uSampler, uv);

	gl_FragColor = vec4(vec3(color.r+color.g+color.b)/3.0, color.a) * uOpacity;
}`
export default coverShader
