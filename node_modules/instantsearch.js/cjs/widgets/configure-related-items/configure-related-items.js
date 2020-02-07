"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _connectConfigureRelatedItems = _interopRequireDefault(require("../../connectors/configure-related-items/connectConfigureRelatedItems"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureRelatedItems = function configureRelatedItems(widgetParams) {
  var makeWidget = (0, _connectConfigureRelatedItems.default)();
  return makeWidget(widgetParams);
};

var _default = configureRelatedItems;
exports.default = _default;