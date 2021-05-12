import { useKaKaoAuth } from 'providers/authProvider/kakaoAuthProvider'
import { useNaverAuth } from 'providers/authProvider/naverAuthProvider'

export default function LoginForm() {
  const { LoginButton: NaverLoginButton } = useNaverAuth()
  const { LoginButton: KaKaoLoginButton } = useKaKaoAuth()

  return (
    <>
      <NaverLoginButton />
      <KaKaoLoginButton />
    </>
  )
}
