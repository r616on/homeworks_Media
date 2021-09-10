import Сhat from "../components/Сhat/Сhat";

const data = [
  ["51.50851,-0.12572", true],
  ["51.50851,-0.12572", true],
  ["[51.50851,-0.12572]", true],
  ["555555555", false],
  ["[some, words]", false],
];

test.each(data)(
  "Test in active valid number = %s , result = %s ",
  (number, expected) => {
    let index;
    document.body.innerHTML = '<div id="container"></div>';
    const container = document.querySelector("#container");
    const widget = new Сhat(container);
    expect(widget.valid(number)).toBe(expected);
  }
);
