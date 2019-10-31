import { Definition } from "../definitions";
import { is_url } from "../../utils";

export const link: Definition = {
  token: "link",
  terminal: true,
  test: (input, index) => {
    let test_string = input.slice(index, input.length);
    const regex = /^\[(.*?)\]\((.*?)(?:\)(?!\)))/;
    const is_candidate = regex.test(test_string);
    return is_candidate && is_url(regex.exec(test_string)![2]);
  },
  tokenize: (input, index) => {
    let test_string = input.slice(index, input.length);
    let matches = /^\[(.*?)\]\((.*?)(?:\)(?!\)))/.exec(test_string);
    let text = matches![1];
    let url = matches![2];
    return {
      type: "link",
      value: matches![0],
      metadata: {
        text,
        url
      }
    };
  }
}