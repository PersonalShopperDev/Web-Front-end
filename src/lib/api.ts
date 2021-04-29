const getApiUrl = (route : string) : string => `http://devapi.ap-northeast-2.elasticbeanstalk.com/v1/${route}`

export default getApiUrl