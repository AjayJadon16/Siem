// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType } from 'src/types/apps/userTypes'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import api from '../../../../services/api'
import authConfig from '../../../../configs/auth'
import Router from 'next/router'

interface Props {
  data: UsersType
}

interface ColorsType {
  [key: string]: ThemeColor
}

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 300,
  fontSize: '1rem',
  alignSelf: 'flex-end'
})

const roleColors: ColorsType = {
  admin: 'error',
  editor: 'info',
  author: 'warning',
  maintainer: 'success',
  subscriber: 'primary'
}

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const UserViewLeft = ({ data }: Props) => {
  // ** States
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openPlans, setOpenPlans] = useState<boolean>(false)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  const cancelHandler = (event: any) => {
    Router.push('/apps/user/list')
  }
  
  const handleeditSubmit = async()=>{
    console.log(firstName,lastName,email,mobile)
    api.defaults.headers.Authorization = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)}`
    const res = await api.put(`/users/${data.id}`,{firstName,lastName,email,mobile})
    console.log(res)
    handleEditClose()
  }
  const [firstName,setfirstName]= useState(data.firstName)
  const firstNamehandler=(event)=>{
    setfirstName(event.target.value)
  }
  const [lastName,setlastName]= useState(data.lastName)
  const lastNamehandler=(event)=>{
    setlastName(event.target.value)
  }
  const [email,setemail]= useState(data.email)
  const emailhandler=(event)=>{
    setemail(event.target.value)
  }
  const [mobile,setmobile]= useState(data.mobile)
  const mobilehandler=(event)=>{
    setmobile(event.target.value)
  }

  const renderUserAvatar = () => {
    if (data) {
      
      if (data) {
        return (
          <CustomAvatar
            alt='User Image'
            src={data.avatar}
            variant='rounded'
            sx={{ width: 120, height: 120, marginBottom: 4 }}
          />
        )
      } else {
        return (
          <CustomAvatar
            skin='light'
            variant='rounded'
            color={data.avatarColor as ThemeColor}
            sx={{ width: 120, height: 120, fontWeight: 600, marginBottom: 4, fontSize: '3rem' }}
          >
            {getInitials(data.fullName)}
          </CustomAvatar>
        )
      }
    } else {
      return null
    }
  }

  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ paddingTop: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
              <Typography variant='h6' sx={{ marginBottom: 2 }}>
                {`${data.firstName} ${data.lastName}`}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.type}
                color={roleColors[data.role]}
                sx={{
                  height: 20,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '5px',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent sx={{ marginTop: 2 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>
                  {/* <CustomAvatar skin='light' variant='rounded' sx={{ marginRight: 3 }}>
                    <Check />
                  </CustomAvatar> */}
                  {/* <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      1.23k
                    </Typography>
                    <Typography variant='body2'>Task Done</Typography>
                  </Box> */}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* <CustomAvatar skin='light' variant='rounded' sx={{ marginRight: 3 }}>
                    <BriefcaseVariantOutline />
                  </CustomAvatar>
                  <Box>
                    <Typography variant='h6' sx={{ lineHeight: 1.3 }}>
                      568
                    </Typography>
                    <Typography variant='body2'>Project Done</Typography>
                  </Box> */}
                </Box>
              </Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Details</Typography>
              <Divider />
              <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>First Name:</Typography>
                  <Typography variant='body2'>{data.firstName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Last Name:</Typography>
                  <Typography variant='body2'>{data.lastName}</Typography>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Email:</Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Status:</Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.status}
                    color={statusColors[data.status]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box> */}
                <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Role:</Typography>
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {data.type}
                  </Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Tax ID:</Typography>
                  <Typography variant='body2'>Tax-8894</Typography>
                </Box> */}
                <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Contact:</Typography>
                  <Typography variant='body2'>{data.mobile}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', marginBottom: 2.7 }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Language:</Typography>
                  <Typography variant='body2'>English</Typography>
                </Box> */}
                {/* <Box sx={{ display: 'flex' }}>
                  <Typography sx={{ marginRight: 2, fontWeight: 500, fontSize: '0.875rem' }}>Country:</Typography>
                  <Typography variant='body2'>{data.country}</Typography>
                </Box> */}
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ marginRight: 3 }} onClick={handleEditClickOpen}>
                Edit
              </Button>

              <Button color='error' variant='outlined' onClick={cancelHandler}>
                Back
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, padding: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText
                  variant='body2'
                  id='user-view-edit-description'
                  sx={{ textAlign: 'center', marginBottom: 7 }}
                >
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='First Name' defaultValue={data.firstName} onChange = {firstNamehandler} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='lastName'
                        defaultValue={data.lastName}
                        onChange={lastNamehandler}
                        // InputProps={{ startAdornment: <InputAdornment position='start'></InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={data.email} onChange={emailhandler}  />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={data.mobile} onChange={mobilehandler}/>
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Role' defaultValue={data.type} />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Status</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.status}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='pending'>Pending</MenuItem>
                          <MenuItem value='active'>Active</MenuItem>
                          <MenuItem value='inactive'>Inactive</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='TAX ID' defaultValue='Tax-8894' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Contact' defaultValue={`+1 ${data.contact}`} />
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-language-label'>Language</InputLabel>
                        <Select
                          label='Language'
                          defaultValue='English'
                          id='user-view-language'
                          labelId='user-view-language-label'
                        >
                          <MenuItem value='English'>English</MenuItem>
                          <MenuItem value='Spanish'>Spanish</MenuItem>
                          <MenuItem value='Portuguese'>Portuguese</MenuItem>
                          <MenuItem value='Russian'>Russian</MenuItem>
                          <MenuItem value='French'>French</MenuItem>
                          <MenuItem value='German'>German</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid> */}
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ marginRight: 1 }} onClick={handleeditSubmit}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Discard
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card sx={{ boxShadow: 'none', border: theme => `2px solid ${theme.palette.primary.main}` }}>
            <CardContent
              sx={{ display: 'flex', flexWrap: 'wrap', paddingBottom: '0 !important', justifyContent: 'space-between' }}
            >
              <CustomChip
                skin='light'
                size='small'
                color='primary'
                label='Standard'
                sx={{ height: 20, fontSize: '0.75rem', fontWeight: 600, borderRadius: '5px' }}
              />
              <Box sx={{ display: 'flex', position: 'relative' }}>
                <Sup>$</Sup>
                <Typography
                  variant='h3'
                  sx={{
                    lineHeight: 1,
                    fontWeight: 600,
                    marginBottom: -1.2,
                    color: 'primary.main',
                    fontSize: '3rem !important'
                  }}
                >
                  99
                </Typography>
                <Sub>/ month</Sub>
              </Box>
            </CardContent>

            <CardContent>
              <Box sx={{ marginTop: 4, marginBottom: 5 }}>
                <Box sx={{ display: 'flex', marginBottom: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ marginRight: 2, fontSize: '0.625rem', color: 'text.secondary' }} />
                  <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                    10 Users
                  </Typography>
                </Box>
                <Box sx={{ marginTop: 2.5, display: 'flex', marginBottom: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ marginRight: 2, fontSize: '0.625rem', color: 'text.secondary' }} />
                  <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                    Up to 10GB storage
                  </Typography>
                </Box>
                <Box sx={{ marginTop: 2.5, display: 'flex', marginBottom: 2.5, alignItems: 'center' }}>
                  <Circle sx={{ marginRight: 2, fontSize: '0.625rem', color: 'text.secondary' }} />
                  <Typography component='span' sx={{ fontSize: '0.875rem' }}>
                    Basic Support
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', marginBottom: 2, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Days</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>26 of 30 Days</Typography>
              </Box>
              <LinearProgress value={86.66} variant='determinate' sx={{ height: 8, borderRadius: '5px' }} />
              <Typography variant='body2' sx={{ marginTop: 2, marginBottom: 4 }}>
                4 days remaining
              </Typography>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handlePlansClickOpen}>
                Upgrade Plan
              </Button>
            </CardContent>

            <Dialog
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby='user-view-plans'
              aria-describedby='user-view-plans-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, paddingTop: 8, paddingBottom: 8 } }}
            >
              <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Upgrade Plan
              </DialogTitle>

              <DialogContent>
                <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                  Choose the best plan for the user.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  display: 'flex',
                  paddingBottom: 8,
                  alignItems: 'center',
                  paddingLeft: [6, 15],
                  paddingRight: [6, 15],
                  flexWrap: ['wrap', 'nowrap'],
                  paddingTop: theme => `${theme.spacing(2)} !important`
                }}
              >
                <FormControl fullWidth size='small' sx={{ marginRight: [0, 3], marginBottom: [3, 0] }}>
                  <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
                  <Select
                    label='Choose Plan'
                    defaultValue='Standard'
                    id='user-view-plans-select'
                    labelId='user-view-plans-select-label'
                  >
                    <MenuItem value='Basic'>Basic - $0/month</MenuItem>
                    <MenuItem value='Standard'>Standard - $99/month</MenuItem>
                    <MenuItem value='Enterprise'>Enterprise - $499/month</MenuItem>
                    <MenuItem value='Company'>Company - $999/month</MenuItem>
                  </Select>
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                  Upgrade
                </Button>
              </DialogContent>

              <Divider sx={{ margin: 0 }} />

              <DialogContent sx={{ paddingTop: 8, paddingLeft: [6, 15], paddingRight: [6, 15] }}>
                <Typography sx={{ fontWeight: 500, marginBottom: 2, fontSize: '0.875rem' }}>
                  User current plan is standard plan
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: ['wrap', 'nowrap'],
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ marginRight: 3, display: 'flex', marginLeft: 2.4, position: 'relative' }}>
                    <Sup>$</Sup>
                    <Typography
                      variant='h3'
                      sx={{
                        lineHeight: 1,
                        marginBottom: -1.2,
                        color: 'primary.main',
                        fontSize: '3rem !important'
                      }}
                    >
                      99
                    </Typography>
                    <Sub>/ month</Sub>
                  </Box>
                  <Button color='error' variant='outlined' sx={{ marginTop: 2 }}>
                    Cancel Subscription
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
