// class to represent string values of the Development Profile
//
//source : https://masteringjs.io/tutorials/fundamentals/enum
class DevelopmentProfile {
    static Local = new DevelopmentProfile('Local');
    static Staging = new DevelopmentProfile('Staging');
    static Production = new DevelopmentProfile('Production');

    constructor(name) {
        this.name = name;
    };
    toString() {
        return `Color.${this.name}`;
    };
};

module.exports = DevelopmentProfile;