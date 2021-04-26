import { useKaKaoLogin } from '../providers/kakaoLoginProvider'
import { useNaverLogin } from '../providers/naverLoginProvider'

export default function LoginForm() {
  const { LoginButton: NaverLoginButton } = useNaverLogin()
  const { LoginButton: KaKaoLoginButton } = useKaKaoLogin()

  return (
    <>
      <NaverLoginButton />
      <KaKaoLoginButton />
    </>
  )
}
