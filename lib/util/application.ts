declare global {
  interface Window {
    ReactNativeWebView: { postMessage: (value: string) => void }
  }
}

export type callApplicationAction = 'logOut'
const callApplication = ({
  action,
  data,
}: {
  action: callApplicationAction
  data: string
}) => {
  if (window?.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(`${action}: ${data}`)
  }
}
export default callApplication
