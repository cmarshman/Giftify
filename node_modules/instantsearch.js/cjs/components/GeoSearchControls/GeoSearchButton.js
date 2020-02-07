"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** @jsx h */
var GeoSearchButton = function GeoSearchButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;
  return (0, _preact.h)("button", {
    className: className,
    onClick: onClick,
    disabled: disabled
  }, children);
};

GeoSearchButton.defaultProps = {
  disabled: false
};
var _default = GeoSearchButton;
exports.default = _default;