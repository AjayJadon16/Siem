import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import api from "../services/api"

const mock = new MockAdapter(axios)

export default mock
