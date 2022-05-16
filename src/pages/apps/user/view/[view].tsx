// ** Next Import
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next/types'



// ** Types
import { InvoiceType } from 'src/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewPage from 'src/views/apps/user/view/UserViewPage'
import api from '../../../../services/api'
import { useRouter } from 'next/router'
import authConfig from '../../../../configs/auth'

const UserView = (
  // { id, invoiceData }: InferGetStaticPropsType<typeof getStaticProps>
  ) => {
  const router = useRouter()
  const view = router.query
  console.log(view)
  
  return <UserViewPage id= {view} 
  // invoiceData={invoiceData}
   />
  
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   api.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
//   const res = await api.get(`/users`)
//   const userDate: InvoiceType[] = await res.data.allData

//   const paths = userDate.map((item: InvoiceType) => ({
//     params: { id: `${item.id}` }
//   }))



//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
//   const res = await api.get(`/users`)
  
//   const invoiceData: InvoiceType[] = res.data.allData
// console.log(res)

//   return {
//     props: {
//       invoiceData,
//       id: params?.id
//     }
//   }
// }

export default UserView
