const {findELement } = require('../ai/selectorHealer');

class LoginPage{
    constructor(page){
        this.page = page;

    }

    async goto(){
        await this.page.goto('/login');
    }

    async login(user, pass){
        await findElement(this.page,["username","[name='user']"]).fill(user);
        await findElement(this.page,["#password","[type = 'password]"]).fill(pass);
        await findElement(this.page,["#login", "text = Login"]).click();
    }
}

module.exports = LoginPage;
