import React from 'react';
import { Document, Page, StyleSheet } from "@react-pdf/renderer"


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white'
  },
});

const MyDocument = ({ children }) => (
  <Document>
    <Page wrap style={styles.page}>
      {children}
    </Page>
  </Document>
)

module.exports = {
  Document: MyDocument
}