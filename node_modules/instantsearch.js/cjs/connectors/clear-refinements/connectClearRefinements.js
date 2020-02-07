"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectClearRefinements;

var _utils = require("../../lib/utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'clear-refinements',
  connector: true
});
/**
 * @typedef {Object} CustomClearRefinementsWidgetOptions
 * @property {string[]} [includedAttributes = []] The attributes to include in the refinements to clear (all by default). Cannot be used with `excludedAttributes`.
 * @property {string[]} [excludedAttributes = ['query']] The attributes to exclude from the refinements to clear. Cannot be used with `includedAttributes`.
 * @property {function(object[]):object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * @typedef {Object} ClearRefinementsRenderingOptions
 * @property {function} refine Triggers the clear of all the currently refined values.
 * @property {boolean} hasRefinements Indicates if search state is refined.
 * @property {function} createURL Creates a url for the next state when refinements are cleared.
 * @property {Object} widgetParams All original `CustomClearRefinementsWidgetOptions` forwarded to the `renderFn`.
 */

/**
 * **ClearRefinements** connector provides the logic to build a custom widget that will give the user
 * the ability to reset the search state.
 *
 * This connector provides a `refine` function to remove the current refined facets.
 *
 * The behaviour of this function can be changed with widget options. If `clearsQuery`
 * is set to `true`, `refine` will also clear the query and `excludedAttributes` can
 * prevent certain attributes from being cleared.
 *
 * @type {Connector}
 * @param {function(ClearRefinementsRenderingOptions, boolean)} renderFn Rendering function for the custom **ClearRefinements** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomClearRefinementsWidgetOptions)} Re-usable widget factory for a custom **ClearRefinements** widget.
 * @example
 * // custom `renderFn` to render the custom ClearRefinements widget
 * function renderFn(ClearRefinementsRenderingOptions, isFirstRendering) {
 *   var containerNode = ClearRefinementsRenderingOptions.widgetParams.containerNode;
 *   if (isFirstRendering) {
 *     var markup = $('<button id="custom-clear-all">Clear All</button>');
 *     containerNode.append(markup);
 *
 *     markup.on('click', function(event) {
 *       event.preventDefault();
 *       ClearRefinementsRenderingOptions.refine();
 *     })
 *   }
 *
 *   var clearRefinementsCTA = containerNode.find('#custom-clear-all');
 *   clearRefinementsCTA.attr('disabled', !ClearRefinementsRenderingOptions.hasRefinements)
 * };
 *
 * // connect `renderFn` to ClearRefinements logic
 * var customClearRefinementsWidget = instantsearch.connectors.connectClearRefinements(renderFn);
 *
 * // mount widget on the page
 * search.addWidgets([
 *   customClearRefinementsWidget({
 *     containerNode: $('#custom-clear-all-container'),
 *   })
 * ]);
 */

function connectClearRefinements(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (widgetParams.includedAttributes && widgetParams.excludedAttributes) {
      throw new Error(withUsage('The options `includedAttributes` and `excludedAttributes` cannot be used together.'));
    }

    var _widgetParams$include = widgetParams.includedAttributes,
        includedAttributes = _widgetParams$include === void 0 ? [] : _widgetParams$include,
        _widgetParams$exclude = widgetParams.excludedAttributes,
        excludedAttributes = _widgetParams$exclude === void 0 ? ['query'] : _widgetParams$exclude,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;
    var connectorState = {
      refine: _utils.noop,
      createURL: function createURL() {
        return '';
      }
    };

    var cachedRefine = function cachedRefine() {
      return connectorState.refine();
    };

    var cachedCreateURL = function cachedCreateURL() {
      return connectorState.createURL();
    };

    return {
      $$type: 'ais.clearRefinements',
      init: function init(_ref) {
        var instantSearchInstance = _ref.instantSearchInstance;
        renderFn({
          hasRefinements: false,
          refine: cachedRefine,
          createURL: cachedCreateURL,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref2) {
        var scopedResults = _ref2.scopedResults,
            createURL = _ref2.createURL,
            instantSearchInstance = _ref2.instantSearchInstance;
        var attributesToClear = scopedResults.reduce(function (results, scopedResult) {
          return results.concat(getAttributesToClear({
            scopedResult: scopedResult,
            includedAttributes: includedAttributes,
            excludedAttributes: excludedAttributes,
            transformItems: transformItems
          }));
        }, []);

        connectorState.refine = function () {
          attributesToClear.forEach(function (_ref3) {
            var indexHelper = _ref3.helper,
                items = _ref3.items;
            indexHelper.setState((0, _utils.clearRefinements)({
              helper: indexHelper,
              attributesToClear: items
            })).search();
          });
        };

        connectorState.createURL = function () {
          return createURL(_utils.mergeSearchParameters.apply(void 0, _toConsumableArray(attributesToClear.map(function (_ref4) {
            var indexHelper = _ref4.helper,
                items = _ref4.items;
            return (0, _utils.clearRefinements)({
              helper: indexHelper,
              attributesToClear: items
            });
          }))));
        };

        renderFn({
          hasRefinements: attributesToClear.some(function (attributeToClear) {
            return attributeToClear.items.length > 0;
          }),
          refine: cachedRefine,
          createURL: cachedCreateURL,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose() {
        unmountFn();
      }
    };
  };
}

function getAttributesToClear(_ref5) {
  var scopedResult = _ref5.scopedResult,
      includedAttributes = _ref5.includedAttributes,
      excludedAttributes = _ref5.excludedAttributes,
      transformItems = _ref5.transformItems;
  var clearsQuery = includedAttributes.indexOf('query') !== -1 || excludedAttributes.indexOf('query') === -1;
  return {
    helper: scopedResult.helper,
    items: transformItems((0, _utils.uniq)((0, _utils.getRefinements)(scopedResult.results, scopedResult.helper.state, clearsQuery).map(function (refinement) {
      return refinement.attribute;
    }).filter(function (attribute) {
      return (// If the array is empty (default case), we keep all the attributes
        includedAttributes.length === 0 || // Otherwise, only add the specified attributes
        includedAttributes.indexOf(attribute) !== -1
      );
    }).filter(function (attribute) {
      return (// If the query is included, we ignore the default `excludedAttributes = ['query']`
        attribute === 'query' && clearsQuery || // Otherwise, ignore the excluded attributes
        excludedAttributes.indexOf(attribute) === -1
      );
    })))
  };
}