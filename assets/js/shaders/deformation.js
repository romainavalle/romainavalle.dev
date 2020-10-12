var deformation = `
precision highp float;
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec2 uMousePos;
uniform vec2 uDimensions;
uniform vec4 filterArea;
uniform float uScale;

vec2 mapCoord( vec2 coord ){
  coord *= filterArea.xy;
  coord += filterArea.zw;
  return coord;
}

vec2 unmapCoord( vec2 coord ){
  coord -= filterArea.zw;
  coord /= filterArea.xy;
  return coord;
}

vec2 warpAmount = vec2(2.2 * uMousePos.y, -2.5 * uMousePos.x );

vec2 warp(vec2 pos)
{
  pos = pos * 2.0 - 1.0;
  pos *= vec2(
    1.0 + (pos.y * pos.y) * warpAmount.x * (uScale),
    1.0 + (pos.x * pos.x) * warpAmount.y * (uScale)
  );
  return pos * 0.5 + 0.5;;
}

void main() {
  vec2 coord = vTextureCoord ;
  coord = mapCoord(coord ) / uDimensions;
  coord = warp( coord );
  coord = unmapCoord(coord * uDimensions) ;
  gl_FragColor = texture2D( uSampler, coord );
}`
export default deformation
