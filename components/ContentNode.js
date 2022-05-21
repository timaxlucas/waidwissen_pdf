import React from 'react';
import ReactPDF, { Image } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Secondary200 } from '../util/colors';


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    fontSize: 10,
    width: "100%"
  },
  question: {
    flexDirection: 'row'
  },
  verticalDivider: {
    height: '100%',
    borderLeftWidth: 2,
    borderLeftColor: 'lightgrey',
    borderLeftStyle: 'dotted',
    width: 1,
  },
  divider: {
    height: 2,
    backgroundColor: 'lightgrey',
    width: '100%'
  },
  primarySynonym: {
  },
  secondarySynonym: {
    marginTop: 3,
  },
  primarySynonymText: {
    fontFamily: 'Helvetica-Bold',
    fontWeight: 600,
    fontSize: 12
  },
  secondarySynonymText: {
    color: '#9e9e9e',
    fontStyle: 'italic',
  },
  answerText: {
    marginTop: 10,
  },
  list: {
  }
});

const isTextType = (type) => {
  return [
    "important",
    "unimportant",
    "text",
    "text-anchor-link",
    "anchor",
    "explanation",
    "qr",
    "external-link",
    "sub",
    "sup"
  ].includes(type)
}

export const buildContent = (children, textStyle) => {

  if (!children) return <></>

  if (children.length == 1) {
    return <ContentNode {...children[0]} textStyle={textStyle} />
  }

  const chunked = []
  for (const child of children) {
    if (isTextType(child.type)) {
      const lastIndex = chunked.length -1
      if (lastIndex >= 0 && chunked[lastIndex] && Array.isArray(chunked[lastIndex])) {
        (chunked[lastIndex]).push(child)
      } else {
        chunked.push([child])
      }
    } else {
      chunked.push(child)
    }
  }
  
  return chunked ? chunked.map((chunk, index) => Array.isArray(chunk) ? (
    <Text key={index}>
      {chunk.map((node, index2) => (
        <ContentNode {...node} key={index2} textStyle={textStyle} />
      ))}
    </Text>
  ) : (
    <ContentNode {...chunk} key={index} textStyle={textStyle} />
  )) : <></>
}


export const ContentNode = (content) => {

  switch (content.type) {
    case "text":
      return <Text>{content.value}</Text>
    case "paragraph":
      return <View style={{flexDirection: "row", flexWrap: 'wrap'}}>{buildContent(content.value)}</View>
    case "text-anchor-link":
      return <Text>{content.value}</Text>
    case "image":
      return <Text>{JSON.stringify(content.value)}</Text>
    case "anchor":
      return <Text>{content.value}</Text>
    case "explanation":
      return <Text>(Erklärung: {buildContent(content.value)})</Text>
    case "list":
      return <View style={styles.list}>{buildContent(content.value)}</View>
    case 'list-item':
      return <View style={{flexGrow: 1}}>
        <Text>- {buildContent(content.value)}</Text>
      </View>
    case "important":
      return <Text>{buildContent(content.value)}</Text>
    case "unimportant":
      return <Text>{buildContent(content.value)}</Text>
    case "header-2":
    case "header-3":
    case "header-4":
    case "header-5":
      return <Text>{buildContent(content.value)}</Text>
    case "note":
      return <Text>{buildContent(content.value)}</Text>
    case "cave":
      return <Text>{buildContent(content.value)}</Text>
    case "tip":
      return <Text>{buildContent(content.value)}</Text>
    default:
      return <></>
  }
}