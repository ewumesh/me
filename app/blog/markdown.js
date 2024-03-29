import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownContent = ({ content }) => {
 return (
    <ReactMarkdown className="dark:text-white" remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
 );
};

export default MarkdownContent;