import React from 'react';
import ReactPDF, { Image } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  img: {

  }
});

const HeaderImage = ({ src }) => {

  return (
    <Image
      style={styles.img}
      src={src}
    />
  )
}

export default HeaderImage