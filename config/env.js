const ENV = process.env.ENV || "staging";

const URLS = {
    dev: "https://dev.example.com",
    staging: "https://staging.example.com",
    prod: "https://example/com",
};

module.exports = URLS[ENV];