import axios from 'axios'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDdhMzM2ZmE4NzEzMDIyMWQ4ZDlhNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0MjY2OTk1MiwiZXhwIjoxNzQyNzU2MzUyfQ.jiJ7_XDl4BP5maqj7O4ErUkE8OODa2NVy2tYnQx2V8o';
const URL = 'http://localhost/';

export const publicRequest = axios.create({
    baseURL: URL,
})

export const userRequest = axios.create({
    baseURL: URL,
    header: {token: `Bearer ${TOKEN}`}
})

// axios.get()