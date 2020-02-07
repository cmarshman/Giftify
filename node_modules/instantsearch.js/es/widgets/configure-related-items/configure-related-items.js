import connectConfigureRelatedItems from '../../connectors/configure-related-items/connectConfigureRelatedItems';

var configureRelatedItems = function configureRelatedItems(widgetParams) {
  var makeWidget = connectConfigureRelatedItems();
  return makeWidget(widgetParams);
};

export default configureRelatedItems;