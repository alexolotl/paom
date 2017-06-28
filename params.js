module.exports = {
  uniforms: {
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

  params: {
    scale: { type: "slider", min: 0, max: 3, step: 0.1, name: "Scale" },
    param1: { type: "slider", min: 0, max: 3, step: 0.1, name: "Param 1" },
    param2: { type: "slider", min: 0, max: 3, step: 0.1, name: "Param 2" },
    color1: { type: "colorpicker", name: "Color 1" },
    color1: { type: "colorpicker", name: "Color 2" }
  };
}
