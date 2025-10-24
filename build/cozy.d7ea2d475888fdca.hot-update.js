"use strict";
self["webpackHotUpdatecozy_home"]("cozy", {
"./node_modules/cozy-search/dist/components/helpers.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  getInstantMessage: () => (getInstantMessage),
  isAssistantEnabled: () => (isAssistantEnabled),
  isMessageForThisConversation: () => (isMessageForThisConversation),
  makeConversationId: () => (makeConversationId),
  pushMessagesIdInState: () => (pushMessagesIdInState),
  sanitizeChatContent: () => (sanitizeChatContent)
});
/* ESM import */var cozy_flags__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-flags/dist/index.browser.js");

const getInstantMessage = assistantState => Object.keys(assistantState.message)
    .sort((a, b) => a - b)
    .map(key => assistantState.message[key])
    .join('');
const makeConversationId = () => `${Date.now()}-${Math.floor(Math.random() * 90000) + 10000}`;
const pushMessagesIdInState = (id, res, setState) => {
    if (id !== res._id)
        return;
    const messagesId = res.messages.map(message => message.id);
    setState(v => (Object.assign(Object.assign({}, v), { messagesId })));
};
const isMessageForThisConversation = (res, messagesId) => messagesId.includes(res._id);
const isAssistantEnabled = () => (0,cozy_flags__WEBPACK_IMPORTED_MODULE_0__["default"])('cozy.assistant.enabled');
/**
 * Sanitize chat content by removing special sources tags like
 * [REF]...[/REF] or [doc_X] that are not currently handled.
 *
 * @param {string} content - content to sanitize
 * @returns {string} sanitized content
 */
const sanitizeChatContent = content => {
    if (!content) {
        return '';
    }
    return (content
        // Remove REFdoc_1/REF
        .replace(/\s?\[REF\][\s\S]*?\[\/REF\]/g, '')
        // Remove [REF]doc_1[/REF]
        .replace(/\s?REF[\s\S]*?\/REF/g, '')
        // remove « [doc_1] »
        .replace(/\s?\[doc_\d+\]/g, ''));
};


}),

});
//# sourceMappingURL=cozy.d7ea2d475888fdca.hot-update.js.map