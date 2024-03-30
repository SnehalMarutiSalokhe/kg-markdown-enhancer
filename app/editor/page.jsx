"use client";

import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { marked } from "marked";

const Page = () => {
  const defaultMarkdown = `
    Marked - Markdown Parser
    ========================

    [Marked] lets you convert [Markdown] into HTML.  Markdown is a simple text format whose goal is to be very easy to read and write, even when not converted to HTML.  This demo page will let you type anything you like and see how it gets converted.  Live.  No more waiting around.

    How To Use The Demo
    -------------------

    1. Type in stuff on the left.
    2. See the live updates on the right.

    That's it.  Pretty simple.  There's also a drop-down option above to switch between various views:

    - **Preview:**  A live display of the generated HTML as it would render in a browser.
    - **HTML Source:**  The generated HTML before your browser makes it pretty.
    - **Lexer Data:**  What [marked] uses internally, in case you like gory stuff like this.
    - **Quick Reference:**  A brief run-down of how to format things using markdown.

    *Why Markdown?*
    -------------

    It's easy.  It's not overly bloated, unlike HTML.  Also, as the creator of [markdown] says,

    - > The overriding design goal for Markdown's
    - > formatting syntax is to make it as readable
    - > as possible. The idea is that a
    - > Markdown-formatted document should be
    - > publishable as-is, as plain text, without
    - > looking like it's been marked up with tags
    - > or formatting instructions.

    Ready to start writing?  Either start changing stuff on the left or
    [clear everything](/demo/?text=) with a simple click.
  `;

  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [searchQuery, setSearchQuery] = useState("");
  const [database, setDatabase] = useState(["Markdown", "Marked", "HTML"]);

  useEffect(() => {
    window.neo4jIntegration = (word) => {
      console.log(`Clicked word: ${word}`);
    };
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const newWord = searchQuery.trim();
    if (newWord !== "" && !database.includes(newWord)) {
      setDatabase([...database, newWord]);
    }
  };

  const highlightWords = (text, searchWords) => {
    return text.replace(/\b(\w+)\b/g, (word) => {
      if (searchWords.includes(word.toLowerCase())) {
        return `<span style="background-color: yellow;">${word}</span>`;
      } else {
        return word;
      }
    });
  };

  const html = marked(markdown);
  const highlightedHtml = highlightWords(html, database); // Highlight keywords

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <div className="border-2 border-black h-full p-0">
          <textarea
            value={markdown}
            className="w-full h-full p-2 text-xl"
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        {/* ======search======== */}
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 text-xl bg-gray-100 rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2 mr-8"
          >
            Search
          </button>
        </div>
      </div>

      <div className="border-2 border-black h-[42rem] p-2 overflow-y-scroll">
        <div dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      </div>
    </div>
  );
};

export default Page;
