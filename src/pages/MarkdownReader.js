import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import '../styles/MarkdownReader.module.css'
import gfm from 'remark-gfm';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function MarkdownReader(content) {
    const components = {
        code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter language={match[1]}
                                   style={atomDark}
                                   PreTag="div" {...props}>
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        <div>
            {/* eslint-disable-next-line react/no-children-prop */}
            <ReactMarkdown components={components} remarkPlugins={[gfm]} children={content.content} />
        </div>
    );
}