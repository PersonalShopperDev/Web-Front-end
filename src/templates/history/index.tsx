import React, { useEffect } from 'react'
import { useHistory } from 'providers/history'
import { useInfinityScroll } from 'providers/infinity-scroll'
import PurchaseListView from 'components/purchase-list-view'

export default function History() {
  const { historyLists, fetchHistoryData } = useHistory()
  const { setOnScrollFunc } = useInfinityScroll()

  useEffect(() => {
    setOnScrollFunc(fetchHistoryData)
  }, [])
  return (
    <>
      {historyLists.map((data) => (
        <PurchaseListView data={data} key={data.paymentId} />
      ))}
    </>
  )
}
