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
"./node_modules/cozy-search/dist/components/queries.js": (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  CHAT_CONVERSATIONS_DOCTYPE: () => (CHAT_CONVERSATIONS_DOCTYPE),
  CHAT_EVENTS_DOCTYPE: () => (CHAT_EVENTS_DOCTYPE),
  FILES_DOCTYPE: () => (FILES_DOCTYPE),
  buildChatConversationQueryById: () => (buildChatConversationQueryById),
  buildFilesByIds: () => (buildFilesByIds),
  buildMyselfQuery: () => (buildMyselfQuery),
  buildRecentConversationsQuery: () => (buildRecentConversationsQuery)
});
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/cozy-client/dist/index.js");
/* ESM import */var cozy_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cozy_client__WEBPACK_IMPORTED_MODULE_0__);

const CONTACTS_DOCTYPE = 'io.cozy.contacts';
const CHAT_CONVERSATIONS_DOCTYPE = 'io.cozy.ai.chat.conversations';
const CHAT_EVENTS_DOCTYPE = 'io.cozy.ai.chat.events';
const FILES_DOCTYPE = 'io.cozy.files';
const defaultFetchPolicy = cozy_client__WEBPACK_IMPORTED_MODULE_0__.fetchPolicies.olderThan(86400); // 24 hours
const buildFilesByIds = ids => {
    return {
        definition: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)(FILES_DOCTYPE).getByIds(ids),
        options: {
            as: `${FILES_DOCTYPE}/${ids.join('')}`,
            fetchPolicy: defaultFetchPolicy
        }
    };
};
const buildChatConversationQueryById = id => {
    return {
        definition: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)(CHAT_CONVERSATIONS_DOCTYPE).getById(id),
        options: {
            as: `${CHAT_CONVERSATIONS_DOCTYPE}/${id}`,
            fetchPolicy: defaultFetchPolicy,
            singleDocData: true
        }
    };
};
const buildMyselfQuery = () => {
    return {
        definition: (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)(CONTACTS_DOCTYPE).where({ me: true }),
        options: {
            as: `${CONTACTS_DOCTYPE}/myself`,
            fetchPolicy: defaultFetchPolicy
        }
    };
};
const buildRecentConversationsQuery = () => ({
    definition: () => (0,cozy_client__WEBPACK_IMPORTED_MODULE_0__.Q)(CHAT_CONVERSATIONS_DOCTYPE)
        .where({
        // TODO : fix
        'cozyMetadata.updatedAt': { $gt: new Date("1999-01-01T00:00:00Z") },
    })
        .indexFields([
        'cozyMetadata.updatedAt'
    ])
        .sortBy([{ 'cozyMetadata.updatedAt': 'desc' }])
        .limitBy(50),
    options: {
        as: CHAT_CONVERSATIONS_DOCTYPE + '/recent',
        fetchPolicy: defaultFetchPolicy
    }
});


}),

});
//# sourceMappingURL=cozy.f1fcfd92f0cbf0da.hot-update.js.map