interface Practice {
  a: string;
  b: string;
}

interface Job {
  c: number;
}

interface Work {
  d: number;
}

type doingz = Job & Work;
type buildingz = Job | Work;

const blah: doingz = {
  c: 8,
  d: 9,
};

const trah: buildingz = {
  c: 10,
};

interface Foo {
  a: string;
  b: string;
  c: string;
}

interface Bar {
  d: number;
}

interface Baz {
  e: number;
}

type krokodili = (Foo & Bar) | (Foo & Baz);

const aligator: krokodili = {
  a: "",
  b: "",
  c: "",
  e: 8,
};

type bovice = Bar | Baz;

const tresnja: bovice = {
  d: 8,
};

interface Kajsija {
  a: string;
  b: number;
  c: string;
}

interface Breskva {
  a: number;
  b: number;
  d: string;
}

type Nektarina = Kajsija & Breskva;

// THIS PROVES POINT

interface Bacteria {
  c: string;
}

interface Voo extends Bacteria {
  a: string;
  b: string;
  d?: never;
}

interface Han extends Bacteria {
  a?: never;
  b: number;
  d: string;
}

type humanType = Voo | Han;

const kripton: humanType = {
  b: 8,
  c: "",
  d: "",
};

export {};
