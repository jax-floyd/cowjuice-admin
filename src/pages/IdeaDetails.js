import React from 'react';

import { useMasterContext } from '../contexts/MasterContext';

const IdeaDetails = () => {

    const { selectedIdea, fetchIdea } = useMasterContext();

    const parse = (string) => {
        let parsed = string.replace(/<a([^>]*)>(.*?)<\/a>/g, (match, p1, p2) => `<a${p1} target="_blank" class="custom-link">${p2}</a>`);
        parsed = parsed.replace(/<sup>(.*?)<\/sup>/g, (match, p1) => `<sup class="cursor-pointer">${p1}</sup>`);
        parsed = parsed.replace(/<blockquote>(.*?)<\/blockquote>/g, (match, p1) => `<blockquote class="font-mono text-xs py-4 px-0 my-4 border-y-[1px]">${p1}</blockquote>`);
        parsed = parsed.replace(/<i>(.*?)<\/i>/g, (match, p1) => `<span class="italic">${p1}</span>`);
        return parsed;
    };

    const countWords = (idea) => {
        // Takes in an idea object and returns the total word count across all sections and subsections in the details array
        let wordCount = 0;
        idea.details.forEach(detail => {
            if (typeof detail === 'object') {
                detail.content.forEach(content => {
                    if (typeof content === 'object') {
                        content.content.forEach(subContent => {
                            wordCount += subContent.split(' ').length;
                        });
                    } else {
                        wordCount += content.split(' ').length;
                    }
                });
            } else {
                wordCount += detail.split(' ').length;
            }
        });

        // Compute minutes to read based on average reading speed of 200 words per minute
        const minutesToRead = Math.ceil(wordCount / 200);

        return { "words": wordCount, "minutes": minutesToRead };
    };

    if (!selectedIdea) {
        const tag = window.location.pathname.split('/').pop();
        fetchIdea(tag);
    };

    if (!selectedIdea) return null;
    
    return (
        <div class="max-w-3xl mx-auto p-4">
            <div class="flex flex-col items-start justify-start">
                <div class="flex flex-row items-start justify-between space-x-4 animate-flip-up">
                    <p class="uppercase font-mono text-xs">
                        {selectedIdea.title}
                    </p>

                    <p class="uppercase font-mono text-xs">|</p>
                
                    <p class="uppercase font-mono text-xs">
                        {selectedIdea.blurb}
                    </p>
                </div>

                <div class="w-full border-[0.5px] my-4" />

                {selectedIdea.graphics && selectedIdea.graphics.length > 0 && (
                    <div class="flex flex-row items-start justify-start w-full space-x-4 animate-fade-up">
                        {selectedIdea.graphics.map((graphic, index) => {
                            return (
                                <img
                                    key={index}
                                    src={graphic.src}
                                    alt={graphic.alt}
                                    class="w-full h-full cursor-events-none"
                                    style={{filter: "grayscale(100%)"}}
                                />
                            )}
                        )}
                    </div>
                )}

                <div class="w-full my-4" />

                <div class="flex flex-row items-start justify-between w-full space-x-4 animate-flip-up">
                    <p class="font-mono text-xs px-4 border border-dashed border-black dark:border-white transition-colors duration-400 rounded-full">
                        <span class="uppercase">{countWords(selectedIdea)['words']} words</span>
                        <span class="mx-2">|</span>
                        <span class="uppercase">{countWords(selectedIdea)['minutes']} minute read</span>
                    </p>
                </div>

                <div class="w-full border-[0.5px] my-4" />

                <div class="flex flex-row items-start justify-between space-x-4 animate-flip-up">
                    <p class="uppercase font-mono text-xs">
                        <span class="font-bold">Question(s) presented: </span>
                        <span class="" dangerouslySetInnerHTML={{ __html: parse(selectedIdea.questions) }}></span>
                    </p>
                </div>

                <div class="w-full border-[0.5px] my-4" />

                <div class="flex flex-row items-start justify-between space-x-4 animate-flip-up">
                    <p class="font-mono text-xs">
                        <span class="uppercase font-bold">Summary: </span>
                        <span class="">{selectedIdea.summary}</span>
                    </p>
                </div>
                
                <div class="w-full border-[0.5px] my-4" />

                <div class="flex flex-col items-start justify-start">
                    <p className="font-serif font-light text-xl animate-fade-down animate-delay-500">
                        {selectedIdea.details.map((detail, index) => {
                            if (typeof detail === 'object') {
                                // If the detail is an object it's a section, in the following format:
                                // { "section": "Section Title", "content": ["Content", "More Content"] }
                                return (
                                    <div className="flex flex-col items-start justify-start" key={index}>
                                        <p className="font-mono font-bold text-xs uppercase mt-8 mb-2">
                                            {detail.section}
                                        </p>
                                        {detail.content.map((content, idx) => {
                                            if (typeof content === 'object') {
                                                // If the content is an object it's a sub-section, in the following format:
                                                // { "section": "Sub-Section Title", "content": ["Content", "More Content"] }
                                                return (
                                                    <div class="flex flex-col items-start justify-start" key={idx}>
                                                        <p class="font-mono font-bld text-xs uppercase mt-4 mb-2">
                                                            {content.subsection}
                                                        </p>
                                                        {content.content.map((subContent, subIdx) => {
                                                            return (
                                                                <p key={subIdx}>
                                                                    <span class="" dangerouslySetInnerHTML={{ __html: parse(subContent) }} />
                                                                    {subIdx === content.content.length - 1 && idx === detail.content.length - 1 && index === selectedIdea.details.length - 1 && (
                                                                        <span class="absolute ml-0" style={{ fontSize: '36px' }}>&#9632;</span>
                                                                    )}
                                                                    {subIdx !== content.content.length - 1 && <div className="my-3" />}
                                                                </p>
                                                            );
                                                        })}
                                                    </div>                                
                                                );
                                            } else {
                                                return (
                                                    <p key={idx}>
                                                        <span class="" dangerouslySetInnerHTML={{ __html: parse(content) }} />
                                                        {idx === detail.content.length - 1 && index === selectedIdea.details.length - 1 && (
                                                            <span class="absolute ml-0" style={{ fontSize: '36px' }}>&#9632;</span>
                                                        )}
                                                        {idx !== detail.content.length - 1 && <div className="my-3" />}
                                                    </p>
                                                );
                                            }
                                        })}
                                        
                                    </div>
                                );
                            } else {
                                return (
                                    <p key={index}>
                                        <span className="" dangerouslySetInnerHTML={{ __html: parse(detail) }} />
                                        {index === selectedIdea.details.length - 1 && (
                                            <span className="absolute ml-0" style={{ fontSize: '36px' }}>&#9632;</span>
                                        )}
                                        {index !== selectedIdea.details.length - 1 && <div className="my-3" />}
                                    </p>
                                );
                            }
                        })}
                    </p>


                    {selectedIdea.notes && selectedIdea.notes.length > 0 && (
                        <>
                            <div class="w-full border-[0.5px] my-4" />
                            {selectedIdea.notes.map((note, index) => (
                                <p 
                                    // Want to us a ref to scroll to the note when clicked
                                    key={index}
                                    class="font-mono text-xs py-2"
                                >
                                    <span>{note.id}: </span>
                                    <span dangerouslySetInnerHTML={{ __html: parse(note.text) }} />
                                </p>
                            ))}
                        </>
                    )}

                </div>  
            </div>
        </div>
    );
};

export default IdeaDetails;