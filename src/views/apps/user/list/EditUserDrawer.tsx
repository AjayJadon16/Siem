// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { addUser } from 'src/store/apps/user'
import authConfig from 'src/configs/auth'
import api from 'src/services/api'


interface SidebarEditUserType {
  open: boolean
  toggle: () => void
  data:object
}

interface UserData {
  email: string
  // company: string
  // country: string
  mobile: string
  firstName: string
  lastName: string
}


const showErrors = (field: string, valueLen: string, min: string) => {
  if (valueLen === 0) {
    return `${field} field is required`
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`
  } else {
    return ''
  }
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const schema = yup.object().shape({
  // company: yup.string().required(),
  // country: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup
    .string()
    .typeError('mobile string field is required')
    .min(10, obj => showErrors('mobile string', obj.value.length, obj.min))
    .max(10, 'Mobile Number can not  exceed more than 20 characters')
    .required(),
  firstName: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .max(20, 'First Name can not  exceed more than 20 characters')
    .required(),
  lastName: yup
    .string()
    .min(3, obj => showErrors('lastName', obj.value.length, obj.min))
    .max(20, 'Last Name can not  exceed more than 20 characters')
    .required()
})



const SidebarEditUser = (props: SidebarEditUserType) => {
  // ** Props
  const { open, toggle,data } = props
  const defaultValues = {
    email: data.email,
    // company: '',
    // country: '',
    mobile: data.mobile,
    firstName: data.firstName,
    lastName: data.lastName
  
  }
  const id = data.id

  // ** State
  const [plan, setPlan] = useState<string>('basic')
  const [role, setRole] = useState<string>(data.type)

  // ** Hooks
  const dispatch = useDispatch()
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const password = "Admin@123"
  const type = "user"

  const onSubmit = async(data: UserData) => {
    console.log(data)
    api.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    const res = await api.put(`/users/${id}`,data)
    console.log(res)

    // dispatch(addUser({ ...data,password,type }))
    toggle()
    reset()
  }

  const handleClose = () => {
    setPlan('basic')
    setRole('super_admin')
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Edit User</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='First Name'
                  onChange={onChange}
                  placeholder='John Doe'
                  error={Boolean(errors.firstName)}
                />
              )}
            />
            {errors.firstName && <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Last Name'
                  onChange={onChange}
                  placeholder='johndoe'
                  error={Boolean(errors.lastName)}
                />
              )}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='email'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='email'
                  value={value}
                  label='Email'
                  onChange={onChange}
                  placeholder='johndoe@email.com'
                  error={Boolean(errors.email)}
                />
              )}
            />
            {errors.email && <FormHelperText sx={{ color: 'error.main' }}>{errors.email.message}</FormHelperText>}
          </FormControl>
          {/* <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='company'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Company'
                  onChange={onChange}
                  placeholder='Company PVT LTD'
                  error={Boolean(errors.company)}
                />
              )}
            />
            {errors.company && <FormHelperText sx={{ color: 'error.main' }}>{errors.company.message}</FormHelperText>}
          </FormControl> */}
          {/* <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='country'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Country'
                  onChange={onChange}
                  placeholder='Australia'
                  error={Boolean(errors.country)}
                />
              )}
            />
            {errors.country && <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>}
          </FormControl> */}
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='mobile'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='string'
                  value={value}
                  label='Mobile'
                  onChange={onChange}
                  placeholder='(397) 294-5153'
                  error={Boolean(errors.mobile)}
                />
              )}
            />
            {errors.mobile && <FormHelperText sx={{ color: 'error.main' }}>{errors.mobile.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='role-select'>Select Role</InputLabel>
            <Select
              fullWidth
              value={role}
              id='select-role'
              label='Select Role'
              labelId='role-select'
              onChange={e => setRole(e.target.value)}
              inputProps={{ placeholder: 'Select Role' }}
            >
              <MenuItem value='super_admin'>Super Admin</MenuItem>
              <MenuItem value='admin'>Admin</MenuItem>
              <MenuItem value='client'>Client</MenuItem>
              <MenuItem value='user'>User</MenuItem>
              {/* <MenuItem value='maintainer'>Maintainer</MenuItem>
              <MenuItem value='subscriber'>Subscriber</MenuItem> */}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='plan-select'>Select Plan</InputLabel>
            <Select
              fullWidth
              value={plan}
              id='select-plan'
              label='Select Plan'
              labelId='plan-select'
              onChange={e => setPlan(e.target.value)}
              inputProps={{ placeholder: 'Select Plan' }}
            >
              <MenuItem value='basic'>Basic</MenuItem>
              <MenuItem value='company'>Company</MenuItem>
              <MenuItem value='enterprise'>Enterprise</MenuItem>
              <MenuItem value='team'>Team</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarEditUser
