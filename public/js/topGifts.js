// Call for Algolia API
const algoliasearch = require("algoliasearch");

const client = algoliasearch("9LENV3M09M", "9e494715411ca16dd6a4ddd315c568df");
const index = client.initIndex("dev_project2");
// '9125cda371bc5942e186a61b2cfbbe47';

index.getsettings().then(result =>(result));