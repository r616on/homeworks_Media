import Сhat from "../components/Сhat/Сhat";

const data = [
  ["51.50851,-0.12572", null],
  ["51.50851,-0.12572", null],
  ["[51.50851,-0.12572]", null],
  ["555555555", true],
  ["[some, words]", true],
];

test.each(data)(
  "Test in active valid number = %s , result = %s ",
  (number, expected) => {
    let index;
    document.body.innerHTML = '<div id="container"></div>';
    const container = document.querySelector("#container");
    const widget = new Сhat(container);
    widget.bindToDOM();
    widget.addPopup();

    const input = container.querySelector(".popup-input");
    const eventInput = new Event("input", { bubbles: true, cancelable: true });
    const eventClikc = new Event("click", { bubbles: true, cancelable: true });
    input.value = number;
    input.dispatchEvent(eventInput);
    const button = container.querySelector(".popup-ok");
    button.dispatchEvent(eventClikc);
    if (container.querySelector(".popup")) {
      index = true;
    } else {
      index = null;
    }
    expect(index).toBe(expected);
  }
);
