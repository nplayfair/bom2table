declare interface part {
  Part: string;
  Value: string;
}

declare interface structuredParts {
  C: {
    [key: string]: string;
  };
  R: {
    [key: string]: string;
  };
  Q: {
    [key: string]: string;
  };
}
