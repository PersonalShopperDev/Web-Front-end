import React from 'react'
import Layout from 'layouts/default'
import CompleteSuggestion from 'templates/cody-suggestion/complete-suggestion'
import CompleteSuggestionAppBar from 'components/app-bar/complete-suggestion'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()
  return (
    <Layout
      header={<CompleteSuggestionAppBar />}
    >
      <CompleteSuggestion coordId={Number(router.query.id)} />
    </Layout>
  )
}
