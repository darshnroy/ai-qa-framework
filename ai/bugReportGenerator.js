function generateBug(testName, error){
    return{
        tittle: `Bug in ${testName}`,
        issue: error,
        steps: ["Run test", "Observe Failure"],
        severity: "High"
    };

}

module.exports = { generateBug}