import React from "react";
import markdownit from "markdown-it";
import highlightjs from "markdown-it-highlightjs";
import DOMPurify from "dompurify";
import "highlight.js/styles/atom-one-dark.css"; // Import the dark theme for highlight.js
import "./Markdown.css"; // Import your custom CSS

type Props = {
    text: string;
};

const md = markdownit().use(highlightjs);

const Markdown = ({ text }: Props) => {
    const htmlContent = md.render(text);
    const safeHtml = DOMPurify.sanitize(htmlContent);

    return (
        <div
            className="markdown"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
        ></div>
    );
};

export default Markdown;
