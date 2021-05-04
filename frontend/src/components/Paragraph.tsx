import React from 'react';

// rename Paragrph from react-native-paper to Paragraph to avoid name clash
import { Paragraph as PParagraph } from 'react-native-paper';

// need this module to parse the raw html that the API returns, and render it accordingly.
// For example to handle <b> tags for displaying bold content (currently only tag handled)
import htmlParser from 'html-parse-stringify';

// hello world this <b> is some </b> example.
//[
//  { content: 'hello world this ' },
//  { tag: 'b', children: [{ content: ' is some ' }] },
//  { content: ' example' },
//];

export const Paragraph = ({ children: text }: { children: string }) => {
  if (!text) return null; //some recipes had no text, so added this

  // html-parse-stringify does not support TypeScript, so used as any[] to mark the type as an array
  // so that later we can use .map on it without errors
  const parsed = htmlParser.parse(text) as any[];
  return (
    <PParagraph numberOfLines={3}>
      {parsed.map(({ content, children }, i) => {
        if (content)
          return <PParagraph key={`${i}-text`}>{content}</PParagraph>;

        if (!children[0]?.content) return null;

        return (
          // at the moment, whatever the tag is, it is interpreted as bold.
          // in the raw html from API, only b and a tags are present. A tags are always towards the end of the
          // paragraph, so it is safe to say because we only render 3 lines, whatever tag we see, will be a b tag
          <PParagraph key={`${i}-text`} style={{ fontWeight: 'bold' }}>
            {children[0]?.content}
          </PParagraph>
        );
      })}
    </PParagraph>
  );
};
