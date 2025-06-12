enum ComponentType {
  R,
  C,
  D,
  Q,
  IC,
  COMPONENT,
}

enum Potentiometers {
  VOL = 'VOL',
  TONE = 'TONE',
  GAIN = 'GAIN',
  RES = 'RES',
  LEVEL = 'LEVEL',
  DIST = 'DIST',
  PRESENCE = 'PRESENCE',
}

declare interface Part {
  Part: string;
  Value: string;
}

declare interface Component extends Part {
  Designator: string; //A letter like R, C, D etc
  ComponentType: ComponentType;
}

declare interface structuredParts {
  C: {
    [key: string]: string;
  };
  R: {
    [key: string]: string;
  };
  Q?: {
    [key: string]: string;
  };
  IC?: {
    [key: string]: string;
  };
  COMPONENT?: {
    [key: string]: string;
  };
}
