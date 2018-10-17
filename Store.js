const App = require('./App');


class Store extends App {
    constructor(name, description, version, rating) {
        super(name, description, version, rating);
        this.apps = [];
    }

    upLoad(app) {
        if (app instanceof App) {

            // console.log(app);

            let obj = this.apps.find(ap => ap.name === app.Name);

            if (obj instanceof App) {

                obj.release({
                    description: app.Description,
                    version: app.Version,
                    rating: app.Rating
                });

                this.apps = this.apps.map(item => {
                    if (item.name === app.Name) {
                        return obj;
                    }
                    return item;
                })
            } else {
                let newApp = new App(app.Name, app.Description, app.Version, app.Rating);
                this.apps.push(newApp);
            }

        } else {
            throw new Error("This is not a valid instance");
        }

    }

    takedownApp(name) {
        let oldlength = this.apps.length;

        this.apps = this.apps.filter(app => app.Name.toLowerCase() !== name.toLowerCase());
        if (this.apps.length === oldlength) {
            throw new Error("app with the given name does not exist in the store")
        }
        let newlength = this.apps.length;


    }

    search(pattern) {
        if (this.apps.length === 0) {
            return [];
        }
        if (!pattern) {
            return this.apps.sort((a, b) => {
                if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
                    return -1;
                }
                if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
                    return 1;
                }
                return 0;
            })
        }
        pattern = pattern.toLowerCase();
        return this.apps.filter(it => {
            return it.Name.toLowerCase().includes(pattern)
        }).sort((a, b) => {
            if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
                return -1;
            }
            if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
                return 1;
            }
            return 0;
        })
    }

    listMostRecentApps(count = 10){
        if ( count >= this.apps.length) {
            return this.apps.reverse();
        }
        return this.apps.slice(Math.max(this.apps.length - count,0)).reverse();
    }

    listMostPopularApps(count = 10){
        if ( count >= this.apps.length) {
            return this.apps.sort((a, b) => {
                if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
                    return -1;
                }
                if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
                    return 1;
                }
                return 0;
            });
        }
    }

}


let testApp1 = new App("Alpha", "this is a Alpha app", 0.1, 3);

let testApp2 = new App("alaba", "this is a Bravo app", 0.1, 3);

let testApp3 = new App("abdo", "this is a Delta app", 0.1, 3);

let testApp4 = new App("Bravo", "this is a Bravo app", 0.1, 3);

let testApp5 = new App("Zulu", "this is a Romu app", 0.1, 3);


let testStore = new Store("test Store", "this is a test Store", 0.1, 6);

testStore.upLoad(testApp1);
testStore.upLoad(testApp2);
testStore.upLoad(testApp3);
testStore.upLoad(testApp4);
testStore.upLoad(testApp5);

// console.log(testStore.apps);
// testStore.takedownApp("Romu");

let res = testStore.listMostRecentApps(3);
console.log(res);


