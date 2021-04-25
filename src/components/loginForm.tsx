import { useNaverLogin } from '../providers/naverLoginProvider'

export default function LoginForm() {
  const { LoginButton: NaverLoginButton } = useNaverLogin()

  return (
    <>
      <NaverLoginButton />
    </>
  )
}
