/*
 * Create a simple webpage with a single button on it. The text in the button should say "I've been clicked 0 times".
 * When the user clicks on the button, two things should happen: The button's text should update to reflect the number
 * of times it has been clicked. So, after being clicked once, it should say "I've been clicked 1 time." After being
 * clicked twice, it should say "I've been clicked two times".
 * Each time the button is clicked, a new button should be added to the page. It should say "I've been clicked 0 times.
 * (It's a new button, so it hasn't been clicked yet). Each button added to the page should have the same interactions
 * as the first button. Clicking it increments its value and creates a new button on the page.
 * When you check your work, make sure that after n button clicks on the page, the sum of all buttons' counters should
 * be n, and there should be n+1 buttons on the page.
 */

document.addEventListener('DOMContentLoaded', fn, false);

function fn() {


    var model = {


        init: function () {
            this.buttonNumber = 1;
            this.buttonArray = [
                {name: 'button1', number: 1, clickCount: 0}
            ];
        },

        addButton: function (name) {
            this.buttonNumber += 1;
            this.buttonArray.push({name: name, number: this.buttonNumber, clickCount: 0})
        },

        getCurrentButtonNumber: function () {
            return this.buttonNumber;
        }


    };

    var controller = {

        init: function () {
            model.init();
            view.init();
        },

        addButton: function (name) {
            model.addButton(name);

        },

        getAllButtons: function () {
            return model.buttonArray;
        },

        handleClickEvent: function (buttonObj) {
            console.log(buttonObj);
            var newButtonName = 'button' + (model.getCurrentButtonNumber() + 1);
            model.addButton(newButtonName);
            buttonObj.clickCount += 1;
            view.clear();
            view.render();
        }

    };

    var view = {

        init: function () {
            this.buttonDiv = document.getElementById('buttondiv');
            this.render();
        },

        render: function () {
            var that = this;
            var buttons = controller.getAllButtons();
            buttons.forEach(function (button) {
                var id = button.name;
                var elem = document.createElement('button');
                elem.setAttribute('id', id);
                elem.innerHTML = "I've been clicked " + button.clickCount + (button.clickCount === 1 ? " time" : " times");
                that.addClickHandler(elem, button);
                that.buttonDiv.appendChild(elem);
            });
        },

        addClickHandler: function (buttonElem, buttonObj) {
            console.log(buttonObj);
            buttonElem.addEventListener('click', function () {
                return controller.handleClickEvent(buttonObj);
            });
        },
        
        clear: function () {
            while (this.buttonDiv.firstChild) {
                this.buttonDiv.removeChild(this.buttonDiv.firstChild);
            }
        }

    };

    controller.init();

}

