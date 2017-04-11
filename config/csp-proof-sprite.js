var Sprite = require('svg-sprite-loader/lib/web/sprite')
var svgOpening = '<svg id="svg-sprite-content" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"'
var contentPlaceHolder = '{content}'
var svgClosing = '</svg>'
Sprite.spriteTemplate = function () { return svgOpening + '><defs>' + contentPlaceHolder + '</defs>' + svgClosing }
var globalSprite = new Sprite()

if (document.body) {
  globalSprite.elem = globalSprite.render(document.body)
} else {
  document.addEventListener('DOMContentLoaded', function () {
    globalSprite.elem = globalSprite.render(document.body)
  }, false)
}

module.exports = globalSprite
