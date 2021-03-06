"use strict";

const { imageMapJSON } = require("../../../index"), ///
      { templateUtilities } = require("necessary");

const { IMAGE_MAP_PATH } = require("../../paths"),
      { namesFromRequest } = require("../../utilities/request"),
      { OVERLAY_IMAGE_SIZE,
        INDEX_PAGE_FILE_PATH,
        IMAGE_DIRECTORY_PATH,
        TEMPLATE_DIRECTORY_PATH,
        TEXT_HTML_CHARSET_UTF8_CONTENT_TYPE } = require("../../constants");

const { parseFile } = templateUtilities;

function indexPageHandler(request, response) {
  const names = namesFromRequest(request),
        overlayImageSize = OVERLAY_IMAGE_SIZE,
        indexPageFilePath = INDEX_PAGE_FILE_PATH,
        imageDirectoryPath = IMAGE_DIRECTORY_PATH,
        templateDirectoryPath = TEMPLATE_DIRECTORY_PATH;

  imageMapJSON(names, imageDirectoryPath, overlayImageSize, function (imageMapJSON) {
    imageMapJSON = JSON.stringify(imageMapJSON, null, "  ");

    const imageMapURI = IMAGE_MAP_PATH, ///
          filePath = `${templateDirectoryPath}${indexPageFilePath}`,
          args = {
            imageMapURI,
            imageMapJSON
          },
          contentType = TEXT_HTML_CHARSET_UTF8_CONTENT_TYPE,
          html = parseFile(filePath, args);

    response.writeHead(200, {"Content-Type": contentType});

    response.end(html);
  });
}

module.exports = indexPageHandler;
