// ==UserScript==
// @name         LinkedIn Cleaner
// @namespace    http://tampermonkey.net/
// @version      2024-03-06
// @description  Only show actual posts on your feed and not likes / comments / reposts.
// @author       You
// @match        https://www.linkedin.com/feed/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    let observer = null;
    function cleanup_feed_skips() {
        let feed_skips = document.getElementsByClassName("feed-skip-link__container");
        for (let i = 0; i < feed_skips.length; i++) {
            feed_skips[0].remove();
        }
    }

    function cleanup_likes_and_comments() {
        let likes = document.getElementsByClassName("update-components-header");
        for (let i = 0; i < likes.length; i++) {
            likes[i].parentNode.remove()
        }
    }

    function cleanup() {
        cleanup_likes_and_comments();
        cleanup_feed_skips();
    }

    function startObserver() {
        observer = new MutationObserver(mutations => {
            for(let mutation of mutations) {
                if ((mutation.target.className === 'relative') || (mutation.target.className == 'visually-hidden')) {
                    cleanup();
                }
            }
        });

        observer.observe(document.querySelector('[aria-label="Main Feed"]'), {childList: true, subtree: true});
        cleanup();
    }


    window.onload = () => {
        setTimeout(() => {
            startObserver();
        }, 1000);
    }
})();
