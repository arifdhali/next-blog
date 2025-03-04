"use client";
import DOMPurify from "dompurify";

export default function SanitizedContent({ content }: { content: string }) {

    const sanitizedHTML = DOMPurify?.sanitize(content);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />

}