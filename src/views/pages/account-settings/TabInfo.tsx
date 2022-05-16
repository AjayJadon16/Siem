// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import FormHelperText from '@mui/material/FormHelperText'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Birth Date' fullWidth {...props} />
})

interface UserData {
  landmark: string
  state: string
  country: string
  city: string
  Address1: string
  Address2: string
  zipcode: string
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
  state: yup
    .string()
    .required()
    .trim()
    .min(3, obj => showErrors('State ', obj.value.length, obj.min))
    .max(20, 'State can not  exceed more than 20 characters'),
  country: yup
    .string()
    .required()
    .trim()
    .min(3, obj => showErrors('Country', obj.value.length, obj.min))
    .max(20, 'Country can not  exceed more than 20 characters'),
  landmark: yup
    .string()
    .required()
    .min(3, obj => showErrors('Landmark', obj.value.length, obj.min))
    .max(20, 'Landmark can not  exceed more than 20 characters'),
  city: yup
    .string()
    .typeError('city string field is required')
    .min(3, obj => showErrors('City', obj.value.length, obj.min))
    .max(20, 'City can not  exceed more than 20 characters')
    .required(),
  Address1: yup
    .string()
   
    .required()
    .min(3, obj => showErrors('Address', obj.value.length, obj.min))
    .max(50, 'Address can not  exceed more than 20 characters'),
  Address2: yup
    .string()
    .min(3, obj => showErrors('Permanent Address', obj.value.length, obj.min))
    .max(50, 'Permanent Address can not  exceed more than 20 characters')
    .required(),
  zipcode: yup
    .string()
    .min(6, obj => showErrors('Zip Code', obj.value.length, obj.min))
    .max(6,'Zip Code cannot exceed more than 6 characters')
    .required()
})

const defaultValues = {
  landmark: '',
  state: '',
  country: '',
  city: '',
  Address1: '',
  Address2: '',
  zipcode: ''
}

const TabInfo = () => {
  // ** State

  // const dispatch = useDispatch()

  const [addresstype, setaddresstype] = useState()
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
    // dispatch(addUser({ ...data,password,type }))
    // toggle()
    data.addresstype = addresstype
    console.log('Hi')
    console.log(data)
    reset()
  }

  return (
    <CardContent>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <InputLabel id='adresstype'>Address type</InputLabel>
            <Select
              fullWidth
              value={addresstype}
              id='addresstype'
              label='Address Type'
              labelId='Address Type'
              onChange={e => setaddresstype(e.target.value)}
              inputProps={{ placeholder: 'Adress type' }}
            >
              <MenuItem value='billing'>Billing Address</MenuItem>
              <MenuItem value='shipping'>Shipping Address</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='Address1'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Address '
                  onChange={onChange}
                  placeholder='Dlf Phase 3'
                  error={Boolean(errors.Address1)}
                />
              )}
            />
            {errors.Address1 && <FormHelperText sx={{ color: 'error.main' }}>{errors.Address1.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='Address2'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Permanent Address'
                  onChange={onChange}
                  placeholder='Dlf phase 2'
                  error={Boolean(errors.Address2)}
                />
              )}
            />
            {errors.Address2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.Address2.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='landmark'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='landmark'
                  value={value}
                  label='Landmark'
                  onChange={onChange}
                  placeholder='Aihp horizon'
                  error={Boolean(errors.landmark)}
                />
              )}
            />
            {errors.landmark && <FormHelperText sx={{ color: 'error.main' }}>{errors.landmark.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='string'
                  value={value}
                  label='city'
                  onChange={onChange}
                  placeholder='Gurgaon'
                  error={Boolean(errors.city)}
                />
              )}
            />
            {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='state'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='state'
                  onChange={onChange}
                  placeholder='Haryana'
                  error={Boolean(errors.state)}
                />
              )}
            />
            {errors.state && <FormHelperText sx={{ color: 'error.main' }}>{errors.state.message}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
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
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='zipcode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  label='Zip Code'
                  onChange={onChange}
                  placeholder='201301'
                  error={Boolean(errors.zipcode)}
                />
              )}
            />
            {errors.zipcode && <FormHelperText sx={{ color: 'error.main' }}>{errors.zipcode.message}</FormHelperText>}
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

export default TabInfo
