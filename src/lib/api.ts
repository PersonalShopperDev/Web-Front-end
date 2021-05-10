export const getApiUrl = (route: string): string => `http://devapi.ap-northeast-2.elasticbeanstalk.com/v1/${route}`

export default (() => {
  const post = async (url: string, payload: any, options? : RequestInit): Promise<Response> => {
    const body = options?.body || JSON.stringify(payload)
    const headers = options?.headers || {
      'Content-Type': 'application/json',
    }
    const method = 'POST'
    return fetch(url, {
      ...options,
      body,
      headers,
      method,
    })
  }
  return {
    post,
  }
})()
