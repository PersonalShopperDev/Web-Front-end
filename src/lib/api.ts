export const getApiUrl = (route: string): string => `http://devapi.ap-northeast-2.elasticbeanstalk.com/v1/${route}`

export default (() => {
  const post = async (url: string, payload: any): Promise<Response> => fetch(url, {
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
  return {
    post,
  }
})()
