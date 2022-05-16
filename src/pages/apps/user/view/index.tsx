// ** Next Import
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** Third Party Imports

// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
import api from 'src/services/api'
import { useRouter } from 'next/router'

const UserView = ({ invoiceData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  
  return <UserViewPage id='627a2ec226f132777a50a7e0' invoiceData={invoiceData} />
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await api.get('/apps/invoice/invoices')
  const invoiceData: InvoiceType[] = res.data.allData

  return {
    props: {
      invoiceData
    }
  }
}

export default UserView
