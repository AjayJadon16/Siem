// ** React Imports
import { ChangeEvent, MouseEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import FormHelperText from '@mui/material/FormHelperText'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

interface UserData {
 
  org_type: string
  org_name: string
  org_size: string
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


const schema = yup.object().shape({
  
 
  org_type: yup
    .string()
    .typeError('org_type string field is required')
    .min(5, obj => showErrors('org_type string', obj.value.length, obj.min))
    .trim()
    .max(20, 'Organization type cannot exceed 20 characters')
    .required(),
  org_name: yup
    .string()
    .min(3, obj => showErrors('First Name', obj.value.length, obj.min))
    .max(20, 'Organization Name cannot exceed 20 characters')
    .trim()
    .required(),
  org_size: yup
    .string()
    .min(3, obj => showErrors('org_size', obj.value.length, obj.min))
    .max(5, 'Organization Name cannot exceed 5 characters')
    .trim()
    .required()
})

const defaultValues = {

  org_type: '',
  org_name: '',
  org_size: ''
}

const TabSecurity = () => {
  // ** States
  // const [values, setValues] = useState<State>({
  //   newPassword: '',
  //   currentPassword: '',
  //   showNewPassword: false,
  //   confirmNewPassword: '',
  //   showCurrentPassword: false,
  //   showConfirmNewPassword: false
  // })

  // // Handle Current Password
  // const handleCurrentPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }
  // const handleClickShowCurrentPassword = () => {
  //   setValues({ ...values, showCurrentPassword: !values.showCurrentPassword })
  // }
  // const handleMouseDownCurrentPassword = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }

  // // Handle New Password
  // const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }
  // const handleClickShowNewPassword = () => {
  //   setValues({ ...values, showNewPassword: !values.showNewPassword })
  // }
  // const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }

  // // Handle Confirm New Password
  // const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }
  // const handleClickShowConfirmNewPassword = () => {
  //   setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword })
  // }
  // const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }
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


  const onSubmit = (data: UserData) => {
    console.log(data)
    
    // dispatch(addUser({ ...data,password,type }))
    // toggle()
    reset()
  }

  return (
    <CardContent>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
       
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='org_name'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Organization Name'
                  onChange={onChange}
                  placeholder='John Doe'
                  error={Boolean(errors.org_name)}
                />
              )}
            />
            {errors.org_name && <FormHelperText sx={{ color: 'error.main' }}>{errors.org_name.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='org_size'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Organization Size'
                  onChange={onChange}
                  placeholder='500'
                  error={Boolean(errors.org_size)}
                />
              )}
            />
            {errors.org_size && <FormHelperText sx={{ color: 'error.main' }}>{errors.org_size.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='org_type'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='org_type'
                  value={value}
                  label='Organization Type'
                  onChange={onChange}
                  placeholder='Ecommerce'
                  error={Boolean(errors.org_type)}
                />
              )}
            />
            {errors.org_type && <FormHelperText sx={{ color: 'error.main' }}>{errors.org_type.message}</FormHelperText>}
          </FormControl>
         
        
          
         
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              Save
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={reset}>
              Reset
            </Button>
          </Box>
        </form>
      </Box>
    </CardContent>
  )
}
export default TabSecurity
