
var validateApp = {
    validateName: function (val) {
        if (typeof (val) !== "string") {
            return new Error('name must be string');
        }
        if (1 > val.length || val.length > 24) {
            return new Error('name must be 1:24 ');
        } else {
            return true;
        }
    },
    validateDesc: function (description) {
        if (typeof (description) !== 'string') {
            return new Error('description must be string');
        } else {
            return true;
        }
    },
    validateVersion: function (version) {
        if (typeof (version) !== "number" || version < 0) {
            return new Error('version must be positive number')
        } else {
            return true;
        }
    },
    validaterating: function (rating) {
        if (typeof (rating) !== "number" || (1 > rating || rating > 10)) {
            return new Error('rating must be from 1 to 10')
        } else {
            return true;
        }
    }
}

class App {
    constructor(name, description, version, rating) {

        if (validateApp.validateName(name) === true) {
            this._name = name
        } else {
            throw validateApp.validateName(name);
        }
        let isValidDesc = validateApp.validateDesc(description);
        if (isValidDesc === true) {
            this._description = description;
        } else {
            throw isValidDesc;
        }

        let isValidVersion = validateApp.validateVersion(version);
        if (isValidVersion === true) {
            this._version = version;
        } else {
            throw isValidVersion
        }

        let isValidRating = validateApp.validaterating(rating);
        if (isValidRating === true) {
            this._rating = rating;
        } else {
            throw isValidRating;
        }



        //, description, version, 
    }

    get Name() {
        return this._name
    }
    set Name(val) {
        // validation
        let res = validateApp.validateName(val);
        if (res === true) {
            this._name = val
        }
        else {
            throw res;
        }
    }

    get Description() {
        return this._description;
    }
    set Description(val) {
        let isValidDesc = validateApp.validateDesc(val);
        if (isValidDesc === true) {
            this._description = val;
        } else {
            throw isValidDesc;
        }
    }


    get Version() {
        return this._version;
    }
    set Version(val) {
        let isValidVersion = validateApp.validateVersion(val);
        if (isValidVersion === true) {
            this._version = val;
        } else {
            throw isValidVersion
        }
    }

    get Rating() {
        return this._rating;
    }
    set Rating(val) {
        let isValidRating = validateApp.validaterating(val);
        if (isValidRating === true) {
            this._rating = val;
        } else {
            throw isValidRating;
        }
    }

    release(option) {
        if (typeof (option) === 'object') {
            if (!option.version) {
                throw new Error('Version is mandtory');
            }
            if (option.version <= this.Version) {
                throw new Error(`version must be high than ${this.Version}`);
            } else {
                this.Version = option.version;
            }
            //check description
            if (option.description) {
                this.Description = option.description;
            }
            //check rating
            if (option.rating) { // remove this check and use validate method directly
                this.Rating = option.rating;
            }

        } else {
            this.Version = option
        }

    }

}

// let testApp = new App("test App","this is a test app",0.1,3);

// console.log("test app init",testApp);

// let option = {
//     version:1.9,
//     rating:"7"
// }
// testApp.release(7);

// console.log("test app prod with option",testApp);
 

module.exports = App;