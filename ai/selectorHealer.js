async function findElement(page,selectors){
    for (let sel of selectors){
        const el = await page.$(sel);
        if(el) return page.locator(sel);

    }
    throw new Error("Element not found");
}
module.exports ={findElement};