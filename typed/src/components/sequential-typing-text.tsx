"use client";

import * as React from "react";

interface SequentialTypingTextProps {
    sentences: string[];
    typingSpeed?: number;
    delayBetweenSentences?: number;
    className?: string;
}

export function SequentialTypingText({
    sentences,
    typingSpeed = 80,
    delayBetweenSentences = 2500,
    className = "",
}: SequentialTypingTextProps) {
    const [currentSentenceIndex, setCurrentSentenceIndex] = React.useState(0);
    const [currentText, setCurrentText] = React.useState("");
    const [isTyping, setIsTyping] = React.useState(false);
    const [completedSentences, setCompletedSentences] = React.useState<
        string[]
    >([]);

    React.useEffect(() => {
        if (currentSentenceIndex >= sentences.length) {
            setIsTyping(false);
            return;
        }

        const currentSentence = sentences[currentSentenceIndex];
        let charIndex = 0;
        setIsTyping(true);
        setCurrentText("");

        const typeInterval = setInterval(() => {
            if (charIndex < currentSentence.length) {
                setCurrentText(currentSentence.slice(0, charIndex + 1));
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setIsTyping(false);
                setCompletedSentences((prev) => [...prev, currentSentence]);
                setCurrentText("");

                // Move to next sentence after delay
                setTimeout(() => {
                    setCurrentSentenceIndex((prev) => prev + 1);
                }, delayBetweenSentences);
            }
        }, typingSpeed);

        return () => clearInterval(typeInterval);
    }, [currentSentenceIndex, sentences, typingSpeed, delayBetweenSentences]);

    return (
        <div className={className}>
            {completedSentences.map((sentence, index) => (
                <div key={index} className="mb-2">
                    {sentence}
                </div>
            ))}
            {currentText && (
                <div className="mb-2">
                    {currentText}
                    {isTyping && (
                        <span className="inline-block w-[2px] text-5xl bg-current ml-1 animate-pulse" />
                    )}
                </div>
            )}
            {!isTyping && currentSentenceIndex < sentences.length && (
                <span className="inline-block w-[2px] text-5xl bg-current ml-1 animate-pulse" />
            )}
        </div>
    );
}
