import Edge from './edge';

export default class Node {
  input: Edge[];
  output: Edge[];
  id: string;

  constructor (input: Edge[] = [], output: Edge[] = [], id: string) {
    this.input = input;
    this.output = output;
    this.id = id;
  }
}
