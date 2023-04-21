// ==UserScript==
// @name         Modify Chat GPT JSON response
// @namespace    http://tampermonkey
// @version      1
// @description  Modify the moderation_results array in the Chat GPT JSON response
// @match        https://chat.openai.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Intercept the API call and modify the JSON response
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        if (input.indexOf('/backend-api/conversation/') !== -1) {
            return originalFetch(input, init).then(function(response) {
                return response.json().then(function(json) {
                    json.moderation_results = [];
                    return new Response(JSON.stringify(json), {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                });
            });
        } else {
            return originalFetch(input, init);
        }
    };
})();
