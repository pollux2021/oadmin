import { API_PREFIX } from './constants'
import { API_PROXCY_URL } from './devConstants'

const PROXY_DEV_CONF = {
  dev: {
    [API_PREFIX]: API_PROXCY_URL,
    ['/rk/reeko_file']: `${API_PROXCY_URL}`,
  },
  preview: {
    [API_PREFIX]: API_PROXCY_URL,
    ['/rk/reeko_file']: `${API_PROXCY_URL}`,
  },
}

export default PROXY_DEV_CONF
