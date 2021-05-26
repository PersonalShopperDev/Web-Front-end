import { NextPageContext } from 'next'

export default function Error({ statusCode } : { statusCode: number}) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const getStatusCode = () => {
    if (res) {
      return res.statusCode
    }
    if (err) {
      return err.statusCode
    }
    return 404
  }
  const statusCode = getStatusCode()
  return { statusCode }
}
