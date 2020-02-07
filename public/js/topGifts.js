const algoliasearch = require("algoliasearch");
const instantsearch = require("instantsearch")

const searchClient = algoliasearch(
    '9LENV3M09M',
    '9125cda371bc5942e186a61b2cfbbe47'
  );
  
  const search = instantsearch({
    indexName: 'dev_project2',
    searchClient,
  });
  
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#searchbox',
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      hitsPerPage: 10,
      templates: {
        item: `
              <div class="hit">
              <div class="hit-image">
              <img src="{{photo}}" alt="{{name}}" height="150" width="200"/>
                  <h3 class="hit-price">{{price}}</h3>
                  <h2 class="hit-name">{{{_highlightResult.name.value}}}</h2>
                  <p class="hit-category">{{{_highlightResult.category.value}}}</p>
                  <button><a class="hit-purchase" href="{{purchase}}" target="_blank"></a>Purchase</button>
              </div>
          </div>`,
        empty: 'We didn\'t find any results for the search <em>"{{query}}"</em>',
      },
    }),
    instantsearch.widgets.pagination({
      container: '#pagination',
    }),
  ]);
  
  search.start();