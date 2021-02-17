import { GetStaticProps, GetStaticPaths, GetStaticPathsResult } from 'next';
import React from 'react';

import { getAllDocumentFiles } from '@utils/mdx/getAllDocumentFiles';
import { getDocument } from '@utils/mdx/getDocument';
import type { Document as DocumentType } from '@utils/mdx/types';

const Document = ({ content }) => (
  <div>
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </div>
);

export const getStaticProps: GetStaticProps<
  DocumentType,
  {
    slug: string[];
  }
> = async ({ params }) => {
  const document = await getDocument(params.slug);

  return {
    props: document,
  };
};

type Paths = GetStaticPathsResult['paths'];

export const getStaticPaths: GetStaticPaths = async () => {
  const documents = await getAllDocumentFiles();
  const paths: Paths = documents.map<Paths[number]>(({ slug }) => ({
    params: {
      slug,
    },
  }));

  return { paths, fallback: false };
};

export default Document;

/* eslint react/no-danger: 0 */