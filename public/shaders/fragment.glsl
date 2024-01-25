  void main() {
    float alpha = 1.2 - smoothstep(10.0, 0.4005, length(gl_PointCoord - vec2(5.5)));
  
    gl_FragColor = vec4(1.0, 1.0, 0.8, alpha);
  }