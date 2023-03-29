import {useState, useEffect} from "react";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import '../styles/MarkdownReader.module.css'
import gfm from 'remark-gfm';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import {marked} from "marked";

export default function MarkdownReader({content}) {
    const [text, setText] = useState(content);
    const[outputText, setOutputText] = useState('');

    useEffect(() => {
        let intervalId;
        if (text?.length > 0) {
            intervalId = setInterval(() => {
                setOutputText(outputText + text.charAt(0));
                setText(text.slice(1));
            }, 100);
        }
        return () => clearInterval(intervalId);
    }, [text, outputText]);

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
            <ReactMarkdown components={components} remarkPlugins={[gfm]} children={outputText} />
        </div>
    );
}