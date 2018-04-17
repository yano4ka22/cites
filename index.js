class AutoComplete {
    constructor(rootBox) {
        this.rootBox = rootBox;
        this.init();
    }

    init(count) {
        this.addContent(count);
        let countTab = 0;
        let actionBefore = 0;
        this.addEvent(countTab, actionBefore);
    }

    addContent(number) {
        let text = '<form action="" method="get">\n' +
            '<input type="text" class="search-box" id="search-box' + number + '" autocomplete="off">\n' +
            '<input type="button" class="button" id="button' + number + '" value="Поиск">\n' +
            '</form>\n' + '<div class="search-area" id="search-area' + number + '"></div>';
        this.rootBox.innerHTML = text;
        this.searchBox = document.getElementById('search-box' + number);
        this.button = document.getElementById('button' + number);
        this.searchArea = document.getElementById('search-area' + number);
    }

    addEvent(countTab, actionBefore) {
        let self = this;
        this.button.addEventListener('click', function () {
            let findCities = self.getCity(self.searchBox.value);
            if (findCities.length !== 0) {
                self.showElement(self.searchArea)
            };
            self.printCity(findCities);
        });
        this.searchBox.addEventListener('keyup', function (event) {
            if (event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13) {
                return;
            } else if (self.searchBox.value.length >= 2) {
                self.searchArea.innerHTML = '';
                self.showElement(self.searchArea);

                let findCities = self.getCity(self.searchBox.value);
                self.printCity(findCities);
            } else if (self.searchBox.value.length <= 2) {
                self.searchArea.innerHTML = '';
                self.hideElement(self.searchArea);
            }
        });
        this.searchArea.addEventListener('click', function (event) {
            let target = event.target;
            self.searchBox.value = target.textContent;
            self.searchArea.innerHTML = '';
            self.hideElement(self.searchArea);
        });
        this.searchBox.addEventListener('keydown', function (event) {
            let getCites = self.searchArea.getElementsByTagName('p');
            if (event.keyCode === 40) {
                if (actionBefore === 2) countTab++;
                if (countTab === 0) {
                    self.darkGrayElement(getCites[0]);
                    if (getCites[getCites.length - 1].classList.contains('darkGrayElement')) {
                        self.transparentElement(getCites[getCites.length - 1]);
                    }
                    countTab++;
                } else {
                    self.darkGrayElement(getCites[countTab]);
                    self.transparentElement(getCites[countTab - 1]);
                    countTab++;
                    if (countTab === getCites.length) countTab = 0;
                }
                actionBefore = 1;
            } else if (event.keyCode === 38) {
                if (actionBefore === 1) countTab--;
                if (countTab === 0) {
                    self.darkGrayElement(getCites[getCites.length - 1]);
                    if (getCites[0].classList.contains('darkGrayElement')) {
                        self.transparentElement(getCites[0]);
                    }
                    countTab = getCites.length - 1;
                } else {
                    self.darkGrayElement(getCites[countTab - 1]);
                    self.transparentElement(getCites[countTab]);
                    countTab--;
                }
                actionBefore = 2;
            } else if (event.keyCode === 13) {
                event.preventDefault();
                self.searchBox.value = getCites[countTab - 1].textContent;
                self.searchArea.innerHTML = '';
                self.hideElement(self.searchArea);
                countTab = 0;
            }
        });
    }

    getCity(spell) {
        spell = spell.trim().toLowerCase();

        let cities = this.CITIES();
        let findedCities = [];
        for (let key in cities) {
            let findIndex = cities[key].toLowerCase().indexOf(spell);
            if (findIndex !== -1) {
                findedCities.push(cities[key]);
            }
        }
        return findedCities;
    }

    printCity(findCities) {
        for (let i = 0; i < findCities.length; i++) {
            let p = document.createElement('p');
            p.className = "get-cites";
            p.innerHTML = findCities[i];
            this.searchArea.appendChild(p);
        }
    }

    showElement(element) {
        element.style.display = 'block';
    }

    hideElement(element) {
        element.style.display = 'none';
    }

    transparentElement(element) {
        element.classList.remove('darkGrayElement');
    }

    darkGrayElement(element) {
        element.classList.add('darkGrayElement');
    }

    CITIES() {
        return {
            1: "Владивосток",
            2: "Екатеринбург",
            3: "Бийск",
            4: "Новосибирск",
            5: "Санкт-Петербург",
            6: "Москва",
            7: "Красноярск",
            8: "Абакан",
            9: "Анапа",
            10: "Ангарск",
            11: "Владимир",
            12: "Горно-Алтайск",
            13: "Дмитров",
            14: "Ессентуки"
        };
    }
}

window.onload = function () {
    let autoBox = document.getElementsByClassName('auto-box');
    for (let i = 0; i < autoBox.length; i++) {
        let autoComplete = new AutoComplete(autoBox[i]);
        autoComplete.init(i);
    }
};

