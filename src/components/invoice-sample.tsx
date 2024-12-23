import React from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'

import { Table, TR, TH, TD } from '@ag-media/react-pdf-table'

const Invoice = ({ invoiceData }) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4',
      padding: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      fontWeight: 'bold',
    },
    logo: {
      width: 200,
      height: 200,
    },
    details: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    table: {
      marginTop: 20,
      border: '1px solid #000',
      borderRadius: 5,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      borderBottom: '1px solid #000',
    },
    total: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginTop: 20,
      gap: 4,
    },
    amount: {
      fontWeight: 'bold',
    },
  })

  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.header}>
          <Image src={invoiceData.logo} style={styles.logo} />
          <Text>{invoiceData.companyName}</Text>
        </View>
        <View style={styles.details}>
          <Text>Invoice Number: {invoiceData.invoiceNumber}</Text>
          <Text>Date: {invoiceData.date}</Text>
          <Text>Billed To:</Text>
          <Text>{invoiceData.billingAddress}</Text>
        </View>
        <View style={styles.table}>
          <Table>
            <TH>
              <TD style={[styles.header]}>Item</TD>
              <TD>Quantity</TD>
              <TD>Price</TD>
              <TD>Total</TD>
            </TH>
            {invoiceData.items.map((item, index) => (
              <TR key={index}>
                <TD>{item.name}</TD>
                <TD align='right'>{item.quantity}</TD>
                <TD align='right'>${item.price.toFixed(2)}</TD>
                <TD align='right'>
                  ${(item.price * item.quantity).toFixed(2)}
                </TD>
              </TR>
            ))}
          </Table>
        </View>
        <View style={styles.total}>
          <Text>Subtotal: ${invoiceData.subtotal.toFixed(2)}</Text>
          <Text>Tax: ${invoiceData.tax.toFixed(2)}</Text>
          <Text>Total: ${invoiceData.total.toFixed(2)}</Text>
        </View>
      </Page>
    </Document>
  )
}

const InvoiceSample = () => {
  const invoiceData = {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu3k1Qx6ju99bM9GSR0Nh9KaxyN3eMShsSuQ&s',
    companyName: 'Acme Corporation',
    invoiceNumber: 'INV001',
    date: '2023-12-23',
    billingAddress: 'John Doe\n123 Main St\nAnytown, USA 12345',
    items: [
      { name: 'Widget A', quantity: 5, price: 10 },
      { name: 'Gadget B', quantity: 3, price: 20 },
    ],
    subtotal: 130,
    tax: 26,
    total: 156,
  }

  return <Invoice invoiceData={invoiceData} />
}

export default InvoiceSample
