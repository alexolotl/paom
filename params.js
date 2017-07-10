var shaderuniforms = {
    time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: [600,600] },
    mouse: { type: "v2", value: [0,0] },
    drag: { type: "v2", value: [0,0] },
    scale: { type: "f", value: 0.0 },
    textureSampler: { type: "t", value: null },
    param1: { type: "f", value: .2 },
    param2: { type: "f", value: 1.0 },
    param3: { type: "f", value: 1.0 },
    param4: { type: "f", value: 1.0 },
    param5: { type: "f", value: 1.0 },
    param6: { type: "f", value: .3 },
    param7: { type: "f", value: 0.07 },
    param8: { type: "f", value: 0 },
    param9: { type: "f", value: 1 },
    param10: { type: "f", value: 1 },
    color1: { type: "f", value: 0xff0c0c },
    color2: { type: "f", value: 0xffffff },
    image: { type: "f", value: 0 }
  };

var shaderparams = {
    param1: { type: "slider", min: 0, max: 3, step: 0.01, name: "Scale" },
    param2: { type: "slider", min: 0, max: 6, step: 0.01, name: "Warp" },
    param3: { type: "slider", min: 0, max: 10, step: 0.01, name: "Warp 2" },
    param4: { type: "slider", min: 0, max: 1, step: 0.01, name: "Blur" },
    param5: { type: "slider", min: 0, max: 3, step: 0.01, name: "Twist" },
    param6: { type: "slider", min: 0, max: .5, step: 0.01, name: "Bloat" },
    param8: { type: "slider", min: 0, max: 3, step: 0.01, name: "Spin" },
    color1: { type: "colorpicker", name: "Color 1" },
    color2: { type: "colorpicker", name: "Color 2" }
  };

var fragShader = `#define M_PI 3.1415926535897932384626433832795
    uniform vec2 resolution;
    uniform float time;
    uniform vec2 mouse;
    uniform sampler2D textureSampler;
    uniform vec2 drag;
    uniform float scale;
    uniform float param1;
    uniform float param2;
    uniform float param3;
    uniform float param4;
    uniform float param5;
    uniform float param6;
    uniform float param7;
    uniform float param8;
    uniform float param9;
    uniform float param10;
    uniform float color1;
    uniform float color2;
    uniform float image;

    vec3 unpackColor(float f) {
    vec3 color;
    color.r = floor(f / 256.0 / 256.0);
    color.g = floor((f - color.r * 256.0 * 256.0) / 256.0);
    color.b = floor(f - color.r * 256.0 * 256.0 - color.g * 256.0);
    // now we have a vec3 with the 3 components in range [0..255]. Let's normalize it!
    return color / 255.0;
    }

    mat4 rotationMatrix(vec3 axis, float angle)
    {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
    }


    void main() {
    vec2 uv = gl_FragCoord.xy / resolution.x;

    vec2 uv2 = vec2(rotationMatrix(vec3(0.,0.,1.), sin(10.*(uv.x-.5)*param5)+cos(param8*uv.y*10.))*vec4(uv-.5, 0., 0.));

    vec3 color1 = unpackColor(color1);
    vec3 color2 = unpackColor(color2);

    uv2 += 3.*sin(uv.y*uv.x*param3);
    uv2 += 2.*sin(uv.x*param2*3.);
    uv2 = fract(uv2*10.*param1);

    float val = length(uv2-.5);

    float smoothcolor = smoothstep(0.4-param6,0.6-param6, val);
    float sharpcolor = smoothstep(0.5-param7, 0.5+param7, smoothcolor);

    val = mix(smoothcolor, sharpcolor, param4);

    color2 = (1.-image)*color2 + image*(texture2D(textureSampler, uv)).xyz;
    color1 = (1.-image)*color1 + image*(1.-color2);

    val = clamp(0.,1.,val);
    vec3 finalcolor = val*color1 + (1.-val)*color2;


    gl_FragColor= vec4(finalcolor, 1.0);
  }`;
