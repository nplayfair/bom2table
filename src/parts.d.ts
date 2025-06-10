enum PartType {
  R,
  C,
  D,
  Q,
  IC,
  COMPONENT,
}

declare interface part {
  Part: string;
  PartType: PartType;
  Value: string;
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
