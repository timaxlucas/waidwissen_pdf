require('dotenv').config()

import React from 'react';
import ReactPDF, { Text, Font } from '@react-pdf/renderer';
// import { Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
// import ddb from "./db/aws"
// import { scanTable, array_chunks } from './helpers/functions';
import { Document } from "./components/Document"
import { ddb } from './db/aws';
import HeaderImage from './components/HeaderImage';
import Header from './components/Header';
import Section from './components/Section';

Font.register(
  {
    family: 'GTWalsheim',
    fonts: [
      { src: "https://waidwissen-media-live.s3.eu-central-1.amazonaws.com/gtwalsheim.ttf" }
    ]
  }
);
Font.register(
  {
    family: 'Open Sans',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans.ttf' },
      { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
    ]
  },
);


(async () => {


  let articleData = await ddb.get({
    TableName: 'waidwissen-article-2',
    Key: { "titleId": 'rehwild' }
  }).promise()

  if (!articleData.Item) {
    return console.log("Article not found");
  }
  articleData = articleData.Item

  const MyDocument = (<Document>
    <HeaderImage src={articleData.headerImage.files[0].src} />
    <Header>{articleData.title}</Header>

    {articleData.sections.map((section) => (
      <Section key={section.title} data={section} />
    ))}
    {/* <Text>{JSON.stringify(articleData)}</Text> */}
  </Document>)

  console.log("Rendering Document...");
  await ReactPDF.render(MyDocument, `Lernkarten.pdf`);
  console.log("...Done")

})()