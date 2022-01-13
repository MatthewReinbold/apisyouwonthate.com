import ReactDOMServer from 'react-dom/server';

import { Feed } from 'feed';
import fs from 'fs';

import { MDXRemote } from 'next-mdx-remote';
import { ChakraProvider } from '@chakra-ui/react';
import { stripHtml } from 'string-strip-html';

import MDXProviderWrapper from './MDXProviderWrapper';

import config from '../../config';
import theme from '../styles/theme';

export const generateRSSFeed = (posts) => {
  // if (process.env.NODE_ENV === 'development') {
  //   return;
  // }

  const { author, description, siteUrl, title } = config.siteMetadata;

  const feed = new Feed({
    title,
    description,
    baseUrl: siteUrl,
    link: siteUrl,
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const {
      frontmatter: { date, excerpt, title },
      source,
      slug,
    } = post;

    const url = `${siteUrl}/blog/${slug}`;

    const htmlContent = ReactDOMServer.renderToStaticMarkup(
      <ChakraProvider resetCSS theme={theme}>
        <MDXProviderWrapper>
          <MDXRemote {...source} />
        </MDXProviderWrapper>
      </ChakraProvider>
    )
      .replace(/href="\/#/g, `href="${siteUrl}#`)
      .replace(/href="\//g, `href="${siteUrl}/`)
      .replace(/src="\//g, `src="${siteUrl}/`);

    const cleanHtmlContent = stripHtml(htmlContent, {
      onlyStripTags: ['script', 'style'],
      stripTogetherWithTheirContents: ['script', 'style'],
    }).result;

    feed.addItem({
      title,
      id: url,
      link: url,
      description: excerpt,
      content: cleanHtmlContent,
      author: [author],
      date: new Date(date),
    });

    // this will be apisyouwonthate.com/rss.xml
    fs.writeFileSync('public/rss.xml', feed.rss2());
  });
};
