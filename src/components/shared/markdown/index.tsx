import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { cx } from '@/utils/cx';

interface MarkdownProps {
    content: string;
    className?: string;
    isTruncated?: boolean;
    lineClamp?: number;
    maxLength?: number;
}

/**
 * Safely truncates content by character length while keeping HTML tags and LaTeX blocks intact.
 * If a tag or LaTeX block starts before the limit, it is included in its entirety.
 */
const truncateContent = (content: string, maxLength: number) => {
    if (!content || content.length <= maxLength) return content;

    const pattern = /(<[^>]+>|\\\[[\s\S]*?\\\]|\$\$[\s\S]*?\$\$|\\\([\s\S]*?\\\)|(?<!\\)\$[^\$]+?(?<!\\)\$|[^<\\$]+)/g;
    const tokens = content.match(pattern) || [];

    let result = '';
    let currentLength = 0;
    let isActuallyTruncated = false;

    for (const token of tokens) {
        const isTag = token.startsWith('<');
        const isLatex = token.startsWith('$') || token.startsWith('\\');

        if (isTag || isLatex) {
            if (currentLength < maxLength) {
                result += token;
                if (isLatex) {
                    currentLength += token.length;
                }
            } else {
                isActuallyTruncated = true;
                break;
            }
        } else {
            if (currentLength + token.length > maxLength) {
                const remaining = maxLength - currentLength;
                result += token.substring(0, remaining);
                currentLength = maxLength;
                isActuallyTruncated = true;
                break;
            } else {
                result += token;
                currentLength += token.length;
            }
        }
    }

    if (isActuallyTruncated) {
        result = result.trimEnd();
        if (!result.endsWith('...')) {
            result += '...';
        }
    }

    return result;
};

// Helper to normalize LaTeX delimiters and handle math inside HTML tags
const preprocessContent = (content: string, isTruncated: boolean = false) => {
    if (!content) return '';

    let processed = content.replace(/\r\n/g, '\n');

    const hasHtml = /<[a-z][\s\S]*>/i.test(processed);
    if (!hasHtml) {
        if (isTruncated) {
            processed = processed.replace(/\n/g, ' ');
        } else {
            processed = processed
                .split('\n')
                .map(line => `<p>${line || '<br/>'}</p>`)
                .join('');
        }
    }

    processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, p1) => {
        const math = p1.trim();
        return `<span data-type="latex" data-latex="${math.replace(/"/g, '&quot;')}" class="latex-node inline-block align-middle" data-display="${!isTruncated}"></span>`;
    });

    processed = processed.replace(/\$\$\s*([\s\S]*?)\s*\$\$/g, (_, p1) => {
        const math = p1.trim();
        return `<span data-type="latex" data-latex="${math.replace(/"/g, '&quot;')}" class="latex-node inline-block align-middle" data-display="${!isTruncated}"></span>`;
    });

    processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, p1) => {
        const math = p1.trim();
        return `<span data-type="latex" data-latex="${math.replace(/"/g, '&quot;')}" class="latex-node inline-block align-middle"></span>`;
    });

    processed = processed.replace(/(?<!\\)\$([^\$]+?)(?<!\\)\$/g, (_, p1) => {
        const math = p1.trim();
        if (!math) return '$ $';
        return `<span data-type="latex" data-latex="${math.replace(/"/g, '&quot;')}" class="latex-node inline-block align-middle"></span>`;
    });

    return processed;
};

export const Markdown = React.memo(({
    content,
    className = '',
    isTruncated = false,
    lineClamp = 1,
    maxLength,
}: MarkdownProps) => {
    if (!content) return null;

    const truncatedContent = React.useMemo(() => (isTruncated && maxLength)
        ? truncateContent(content, maxLength)
        : content, [content, isTruncated, maxLength]);

    const normalizedContent = React.useMemo(() => preprocessContent(truncatedContent, isTruncated), [truncatedContent, isTruncated]);

    const containerClasses = React.useMemo(() => isTruncated
        ? cx(`block text-primary line-clamp-${lineClamp} overflow-hidden`, className)
        : cx(`prose prose-sm dark:prose-invert w-full max-w-none [&&_p]:leading-relaxed`, className), [isTruncated, lineClamp, className]);

    const components = React.useMemo(() => ({
        p: ({ node, children, ...props }: any) => {
            const childrenArray = React.Children.toArray(children);
            const hasBlockElement = childrenArray.some(
                child => React.isValidElement(child) &&
                    (typeof child.type !== 'string' || ['div', 'table', 'img', 'p'].includes(child.type as string))
            );

            if (hasBlockElement) {
                return <div {...props} className="mb-4 last:mb-0 leading-relaxed">{children}</div>;
            }
            return <p {...props} className="mb-4 last:mb-0 leading-relaxed">{children}</p>;
        },
        h1: ({ node, ...props }: any) => <h1 {...props} className="text-xl font-bold mb-3 mt-6 first:mt-0 text-primary" />,
        h2: ({ node, ...props }: any) => <h2 {...props} className="text-lg font-bold mb-2.5 mt-5 first:mt-0 text-primary" />,
        h3: ({ node, ...props }: any) => <h3 {...props} className="text-base font-bold mb-2 mt-4 first:mt-0 text-primary" />,
        ul: ({ node, ...props }: any) => <ul {...props} className="list-disc pl-5 mb-3 space-y-1 text-tertiary" />,
        ol: ({ node, ...props }: any) => <ol {...props} className="list-decimal pl-5 mb-3 space-y-1 text-tertiary" />,
        li: ({ node, ...props }: any) => <li {...props} className="leading-relaxed text-tertiary" />,
        a: ({ node, ...props }: any) => <a {...props} target="_blank" rel="noopener noreferrer" className="text-brand-secondary hover:underline" />,
        img: ({ node, ...props }: any) => (
            <img
                {...props}
                className="rounded-2xl border border-secondary my-4 max-w-full h-auto"
            />
        ),
        table: ({ node, ...props }: any) => (
            <div className="my-4 overflow-x-auto rounded-xl border border-secondary shadow-sm w-full max-w-full">
                <table {...props} className="w-full min-w-max border-collapse bg-primary text-left m-0" />
            </div>
        ),
        thead: ({ node, ...props }: any) => <thead {...props} className="bg-secondary_alt border-b border-secondary" />,
        th: ({ node, ...props }: any) => <th {...props} className="px-5 py-3 text-xs font-semibold text-quaternary uppercase tracking-wider align-middle border-r border-secondary last:border-r-0" />,
        td: ({ node, ...props }: any) => <td {...props} className="px-5 py-3 text-sm text-tertiary border-b border-r border-secondary last:border-r-0 align-middle" />,
        tr: ({ node, ...props }: any) => <tr {...props} className="hover:bg-secondary_alt transition-colors last:[&>td]:border-b-0" />,
        span: ({ node, ...props }: React.HTMLAttributes<HTMLSpanElement> & { node?: any; 'data-latex'?: string; 'data-display'?: string | boolean }) => {
            const latex = (props as any)['data-latex'];
            if (latex) {
                try {
                    const isDisplay = (props as any)['data-display'] === 'true' || (props as any)['data-display'] === true;
                    const html = katex.renderToString(latex, {
                        throwOnError: false,
                        displayMode: isDisplay,
                    });

                    const Component = isDisplay ? 'div' : 'span';

                    return (
                        <Component
                            {...props}
                            className={cx(props.className, isDisplay ? 'w-full overflow-x-auto my-4 text-center' : 'inline-block align-middle')}
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    );
                } catch (error) {
                    console.error('LaTeX error:', error);
                    return <span {...props}>{latex}</span>;
                }
            }
            return <span {...props} />;
        }
    }), []);

    return (
        <div className={containerClasses}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .katex-display {
                    overflow-x: auto;
                    overflow-y: hidden;
                    padding: 0.5em 0;
                    margin: 0;
                    max-width: 100%;
                }
                .katex-mathml {
                    display: none !important;
                }
                .katex-html {
                    display: inline-block;
                    vertical-align: middle;
                }
                .katex {
                    white-space: nowrap;
                    text-indent: 0;
                    line-height: normal;
                }
            `}} />
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeRaw, [rehypeKatex, { output: 'html' }]]}
                components={components as any}
            >
                {normalizedContent}
            </ReactMarkdown>
        </div>
    );
});

Markdown.displayName = 'Markdown';
