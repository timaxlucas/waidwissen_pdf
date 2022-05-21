import React from 'react';
import ReactPDF, { Image } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header: {
    fontFamily: 'GTWalsheim',
    fontSize: 30,
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 30
  }
});

const Header = ({ children }) => {

  return (
    <Text style={styles.header}>
      {children}
    </Text>
  )
}

export default Header