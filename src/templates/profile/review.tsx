import React from 'react'
import Review from 'components/review'
import ReviewProvider from 'providers/review'
import InfinityScrollProvider from 'providers/infinity-scroll'

export default function ProfileReview({
  userId,
}: {
  userId: number
}) {
  return (
    <InfinityScrollProvider>
      <ReviewProvider>
        <Review id={userId} isProfile />
      </ReviewProvider>
    </InfinityScrollProvider>
  )
}
