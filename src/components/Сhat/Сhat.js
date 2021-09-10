import moment from "moment";

export default class Сhat {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.location = undefined;
    // this.url = 'localhost';

    this.onClick.bind(this);
    this.valid.bind(this);
    // this.wsMessage.bind(this);
    // this.connect.bind(this);
  }

  static get markup() {
    return `  <div class="chat">
        <div class="chat__row">
          <div class="chat-body">
            <div class="chat-body__row">


            </div>
            
              <div class="control">
                <form class="input">
              <input
                class="input__massage"
                type="text"
                placeholder="Введите ваше сообщение"
              />
                <ul class="control-row">
                  <li class="control-item start audio">
                  </li>
                  <li class="control-body"></li>
                  <li class="control-item end video">
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>`;
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    this.widget = this.parentEl.querySelector(".chat");
    this.widget.addEventListener("click", (evt) => this.onClick(evt));
    this.widget.querySelector(".input").addEventListener("submit", (e) => {
      e.preventDefault();
      const input = this.widget.querySelector(".input__massage");
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const crd = pos.coords;
            const location = `${crd.latitude},${crd.longitude}`;
            if (input.value) {
              this.addMassage(input.value, location);
              input.value = "";
            }
          },
          () => this.addPopup()
        );
      } else {
        this.addPopup();
      }
    });
  }

  onClick(e) {
    if (e.target.closest(".popup-ok")) {
      const inputPopup = this.parentEl.querySelector(".popup-input");
      const input = this.widget.querySelector(".input__massage");
      if (input.value) {
        if (this.valid(inputPopup.value)) {
          const location = inputPopup.value;
          const popup = this.parentEl.querySelector(".popup");
          popup.remove();
          this.addMassage(input.value, location);
          input.value = "";
        } else {
          alert("не верные координаты");
        }
      }
    }
    if (e.target.closest(".popup-cancel")) {
      const popup = this.parentEl.querySelector(".popup");
      popup.remove();
    }
    /// login btn
  }
  valid(str) {
    const regExp = /^\[?([-+]?\d{1,2}[.]\d+),\s*([-+]?\d{1,3}[.]\d+)\]?$/gm;
    return regExp.test(str);
  }

  addMassage(textMassage, location) {
    const massage = document.createElement("div");

    massage.className = "massage";
    massage.innerHTML = `
                <div class="massage-item">
                  <div class="massage-title">
                    <div class="author"></div>
                    <div class="date">${moment().format(
                      " h:mm:ss, DD.MM.YYYY"
                    )}</div>
                  </div>
                  <div class="massage-text">${textMassage}</div>
                  <div class="massage-location">${location}</div>
                </div>          
            `;

    this.parentEl.querySelector(".chat-body__row").append(massage);
  }

  addPopup() {
    const popup = document.createElement("div");

    popup.className = "popup";
    popup.innerHTML = ` 
  <div class="popup-row">
  <div class="popup-text">
<span class="popup-text-title">что то пошло не так</span>
<span class="popup-text-body">К сожелению нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации, лобо введите координаты вручную.</span>
<span class="popup-text-title">Широта и долгота через запятую</span>
  </div>
  <input class="popup-input" placeholder="1239.1,343434.2" type="text">
</input>
  <div class="popup-futter">
    <button class="btn popup-cancel">Отмена</button>
    <button class="btn popup-ok">Ок</button>
  </div>
  </div>
            `;

    this.parentEl.querySelector(".chat").append(popup);
  }
}
