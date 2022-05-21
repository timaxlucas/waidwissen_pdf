import React from 'react';
import ReactPDF, { Image } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Secondary200 } from '../util/colors';
import { buildContent } from './ContentNode';

const styles = StyleSheet.create({
  section: {
    borderBottom: `1px solid ${Secondary200}`
  },
  title: {
    fontFamily: 'GTWalsheim',
    fontSize: 20,
    marginVertical: 20,
    paddingHorizontal: 30
  },
  wrapper: {
    marginVertical: 10,
    fontSize: 12
  }
});


const Section = ({ data }) => {

  return (
    <View style={styles.section}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.wrapper}>
        {buildContent(data.body.slice(1, 3))}
      </View>
    </View>
  )
}

export default Section