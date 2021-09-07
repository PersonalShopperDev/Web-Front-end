/* eslint-disable no-shadow */
import React, {
  useContext, createContext, useRef, useEffect, useState,
} from 'react'
import communicate from 'lib/api'

interface Review {
    id: number
    name: string
    profileImg: string
    img: Array<string>
    rating: number
    content: string
    date: string
    height?: number
    weight?: number
    body: {
        id: number
        value: string
    }
    styleTypeList: [{
        id: number
        value: string
    }]
}

interface ReviewBox {
    rating: number
    totalCount: number
}

interface ReviewProps {
    reviewLists: Review[]
    review: ReviewBox
    fetchReviewData: () => Promise<void>
    setId: (value: number) => void
    setTargetId: (value: number) => void
}

type ReviewRefProps = {
    value: Review[],
    id: number
}

const ReviewContext = createContext<ReviewProps>(null)

export const useReview = () => useContext(ReviewContext)

export default function ReviewProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [reviewLists, setReviewLists] = useState([])
  const [review, setReview] = useState<ReviewBox>(null)
  const [id, setId] = useState(null)
  const [targetId, setTargetId] = useState(null)
  const [isTargetFound, setIsTargetFound] = useState(false)
  const ReviewRef = useRef<ReviewRefProps>({ value: [], id: null })
  const pageNum = 20
  const fetchReviewData = async () => {
    const page = ReviewRef.current.value.length / pageNum
    if (Math.floor(ReviewRef.current.value.length / pageNum) !== page) return
    const res = await communicate({ url: `/profile/${ReviewRef.current.id}/review?page=${page}` })

    if (res.status !== 200) {
      return
    }

    const newReview = await res.json()
    ReviewRef.current.value = ReviewRef.current.value.concat(newReview.list)
    if (targetId) {
      newReview.list.forEach((review) => {
        if (review.id === targetId) {
          setIsTargetFound(true)
          const targetReview = [review]
          ReviewRef.current.value = targetReview.concat(
            ReviewRef.current.value.filter((value) => value.id !== targetId),
          )
        }
      })
    }
    setReviewLists(ReviewRef.current.value)
    setReview({ rating: newReview.rating, totalCount: newReview.totalCount })
    if (targetId && !isTargetFound) fetchReviewData()
  }
  useEffect(() => {
    ReviewRef.current.value = reviewLists
  }, [ReviewRef])
  useEffect(() => {
    ReviewRef.current.id = id
    fetchReviewData()
  }, [id])

  const value = {
    reviewLists,
    review,
    fetchReviewData,
    setId,
    setTargetId,
  }
  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
}
