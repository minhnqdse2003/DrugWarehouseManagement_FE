import {
  BlobProvider,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer'
import { Meta, StoryObj } from '@storybook/react'
import { Table, TD, TH, TR } from '@ag-media/react-pdf-table'
import { Download, Printer } from 'lucide-react'

const meta: Meta = {
  title: 'Components/Pdf Generate',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj

export const Default: Story = {
  render: () => {
    const invoiceData: invoiceProps = {
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

    type invoiceProps = {
      logo: string
      companyName: string
      invoiceNumber: string
      date: string
      billingAddress: string
      items: itemProps[]
      subtotal: number
      tax: number
      total: number
    }

    type itemProps = {
      name: string
      quantity: number
      price: number
    }

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
      btn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid',
        width: 'fit-content',
        padding: '.5rem',
        // marginBottom: '1rem',
      },
    })

    const Invoice = () => (
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
                  <TD>{item.quantity}</TD>
                  <TD>${item.price.toFixed(2)}</TD>
                  <TD>${(item.price * item.quantity).toFixed(2)}</TD>
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

    return (
      <div className='w-[50vw] h-[750px]'>
        <PDFViewer width='100%' height='100%' style={{ margin: '3em' }}>
          <Invoice />
        </PDFViewer>
        <div className='flex flex-row justify-start gap-2'>
          <PDFDownloadLink document={<Invoice />} fileName='invoice.pdf'>
            <div style={styles.btn}>
              <Download size={14} />
              <span>Download</span>
            </div>
          </PDFDownloadLink>
          <BlobProvider document={<Invoice />}>
            {({ url }) => (
              <a href={url} target='_blank' style={styles.btn}>
                <Printer size={14} />
                <span>Print</span>
              </a>
            )}
          </BlobProvider>
        </div>
      </div>
    )
  },
}
