function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import escapeHits, { TAG_PLACEHOLDER } from '../../lib/escape-highlight';
import { checkRendering, createDocumentationMessageGenerator, addAbsolutePosition, addQueryID, noop } from '../../lib/utils';
var withUsage = createDocumentationMessageGenerator({
  name: 'hits',
  connector: true
});
/**
 * @typedef {Object} HitsRenderingOptions
 * @property {Object[]} hits The matched hits from Algolia API.
 * @property {Object} results The complete results response from Algolia API.
 * @property {Object} widgetParams All original widget options forwarded to the `renderFn`.
 */

/**
 * @typedef {Object} CustomHitsWidgetOptions
 * @property {boolean} [escapeHTML = true] Whether to escape HTML tags from `hits[i]._highlightResult`.
 * @property {function(Object[]):Object[]} [transformItems] Function to transform the items passed to the templates.
 */

/**
 * **Hits** connector provides the logic to create custom widgets that will render the results retrieved from Algolia.
 * @type {Connector}
 * @param {function(HitsRenderingOptions, boolean)} renderFn Rendering function for the custom **Hits** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomHitsWidgetOptions)} Re-usable widget factory for a custom **Hits** widget.
 * @example
 * // custom `renderFn` to render the custom Hits widget
 * function renderFn(HitsRenderingOptions) {
 *   HitsRenderingOptions.widgetParams.containerNode.html(
 *     HitsRenderingOptions.hits.map(function(hit) {
 *       return '<div>' + hit._highlightResult.name.value + '</div>';
 *     })
 *   );
 * }
 *
 * // connect `renderFn` to Hits logic
 * var customHits = instantsearch.connectors.connectHits(renderFn);
 *
 * // mount widget on the page
 * search.addWidgets([
 *   customHits({
 *     containerNode: $('#custom-hits-container'),
 *   })
 * ]);
 */

export default function connectHits(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _widgetParams$escapeH = widgetParams.escapeHTML,
        escapeHTML = _widgetParams$escapeH === void 0 ? true : _widgetParams$escapeH,
        _widgetParams$transfo = widgetParams.transformItems,
        transformItems = _widgetParams$transfo === void 0 ? function (items) {
      return items;
    } : _widgetParams$transfo;
    return {
      $$type: 'ais.hits',
      init: function init(_ref) {
        var instantSearchInstance = _ref.instantSearchInstance;
        renderFn({
          hits: [],
          results: undefined,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, true);
      },
      render: function render(_ref2) {
        var results = _ref2.results,
            instantSearchInstance = _ref2.instantSearchInstance;

        if (escapeHTML && results.hits.length > 0) {
          results.hits = escapeHits(results.hits);
        }

        var initialEscaped = results.hits.__escaped;
        results.hits = addAbsolutePosition(results.hits, results.page, results.hitsPerPage);
        results.hits = addQueryID(results.hits, results.queryID);
        results.hits = transformItems(results.hits); // Make sure the escaped tag stays, even after mapping over the hits.
        // This prevents the hits from being double-escaped if there are multiple
        // hits widgets mounted on the page.

        results.hits.__escaped = initialEscaped;
        renderFn({
          hits: results.hits,
          results: results,
          instantSearchInstance: instantSearchInstance,
          widgetParams: widgetParams
        }, false);
      },
      dispose: function dispose(_ref3) {
        var state = _ref3.state;
        unmountFn();

        if (!escapeHTML) {
          return state;
        }

        return state.setQueryParameters(Object.keys(TAG_PLACEHOLDER).reduce(function (acc, key) {
          return _objectSpread({}, acc, _defineProperty({}, key, undefined));
        }, {}));
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(state) {
        if (!escapeHTML) {
          return state;
        }

        return state.setQueryParameters(TAG_PLACEHOLDER);
      }
    };
  };
}