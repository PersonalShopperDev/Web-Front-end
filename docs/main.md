# __Documentation__

## __Index__
## src
+ [widgets](#widgets)
+ [components](#components)
+ [providers](#providers)
## lib
+ [api](#api)
+ [config](#config)
+ [hooks](#hooks)
+ [server](#server)
+ [util](#util)

<br />

## __Widgets__
---
## __`Icon`__
기본 아이콘 위젯입니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|className|`string`|`null`|-|
|src|`string`|-|`/icons/${src}`|
|size|`number`|`16`|-|
|onClick|`MouseEventHandler`|`null`|-|
### __Usage__
```
<Icon src="my-icon.png" onClick={() => {console.log("Hello World!")}} />
```

<br />

## __`Avatar`__
원형 컨테이너로 이미지를 담습니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|src|`string`|-|-|
|size|`number`|`32`|-|
|href|`string`|`null`|-|
### __Usage__
```
<Avatar src="/images/my-avatar.jpg" href="/mypage" />
```

<br />

## __Components__
---
## __`AppBar`__
타이틀, 뒤로가기, 프로필 이동 버튼 등을 포함하는 앱 상단 고정 메뉴 입니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|title|`ReactNode`|`null`|-|
|landings|`ReactNode[]`|`null`|컴포넌트를 좌측 컨테이너에 포함시킵니다.|
|actions|`ReactNode[]`|`null`|컴포넌트를 우측 컨테이너에 포함시킵니다.|
|back|`boolean`|`false`|뒤로가기를 활성화합니다. `landings !== null`인 경우 무시됩니다.|
### __Usage__
```
<AppBar
  title="home"
  actions={[
    <Avatar
      key="avatar"
      src="/images/my-avatar.jpg"
      size={31}
      href="/"
    />,
  ]}
  back,
/>
```

<br/>

## __`Carousel`__
드래그로 전환을 지원하는 슬라이드 쇼입니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|children|`ReactNode[]`|-|슬라이드를 배열 형식으로 전달합니다.|
|className|`string`|`null`|-|
|extraChild|`ReactNode`|`null`|컨테이너 바깥에 있으나 Context Provider를 통해 정보를 얻고자 하는 노드입니다.|

|Context Prop|Type|Remark|
|---|---|---|
|currentIndex|`number`|현재 슬라이드가 몇 번째인지를 가리킵니다.|
### __Usage__
```
<Carousel>
  {slides.map(({ src, caption }) => (
    <figure>
      <img src={src} />
      <figcaption>
        {caption}
      </figcaption>
    <figure/>
  ))}
</Carousel>
```

<br/>

## __`Modal`__
드래그로 전환을 지원하는 슬라이드 쇼입니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|children|`ReactNode`|-||
|className|`string`|`null`|-|
|ref|`MutableRefObject<HTMLDivElement>`|`null`|-|
|initializer|`ReactNode`|`null`|-|
|immediate|`boolean`|`false`|-|
|controller|`React.Dispatch<SetStateAction<boolean>>`|`null`|-|
|onClose|`() => void`|`null`|-|

|Context Prop|Type|Remark|
|---|---|---|
|active|`boolean`|현재 모달의 활성화 상태입니다.|
|close|`() => void`|닫기를 요청합니다.|
### __Usage__
```
<Carousel>
  {slides.map(({ src, caption }) => (
    <figure>
      <img src={src} />
      <figcaption>
        {caption}
      </figcaption>
    <figure/>
  ))}
</Carousel>
```

<br />

## __Providers__
---
## __`AuthProvider`__
유저 정보를 처리합니다.

|Context Prop|Type|Remark|
|---|---|---|
|user|`User`|-|
|authenticate|`(provider: string, token: string) => Promise<void>`|3rd Party Token Provider와 그들에게 전달받은 토큰을 매개변수로 받습니다.|
|signout|`() => Pormise<void>`|로그아웃을 요청합니다.|

<br/>

## __`ModalProvider`__
Modal 컴포넌트들의 컨테이너를 `<main />`의 바깥쪽에 제공합니다.

|Context Prop|Type|Remark|
|---|---|---|
|appendToContainer|`User`|modal Container에 추가를 요청합니다.|
|attachScrimOnClick|`(func: Listener) => void`|scrim에 onClick 이벤트 리스너를 추가합니다.|
|detachScrimOnClick|`(func: Listener) => void`|scrim에 onClick 이벤트 리스너를 제거합니다.|
|update|`(state: boolean) => void`|자식 Modal은 부모에게 자신의 상태를 알립니다.|

### __Interface__
```
type Listener = (this: HTMLDivElement, ev: MouseEvent) => any
```

<br/>

## __`DialogProvider`__
Dialog 컴포넌트들을 `ModalProvider`의 Container 아래에서 관리하며 커스텀 Dialog를 제작할 수 있는 함수를 제공합니다. <br/>
`buildDialog()`를 호출한 뒤에는 `open()`을 통해 `Promise`를 반환 받아야 정상적으로 dialog가 요청되며 사용자의 입력을 기다릴 수 있습니다.

|Context Prop|Type|Remark|
|---|---|---|
|buildDialog|`(props? : DialogRequestProps) => DialogBuilder`|-|
### __Interface__
```
interface DialogRequestProps {
  className?: string
}

type Inner =
  | React.ReactNode
  | ((props: { ok?: EventHandler, cancle?: EventHandler }) => React.ReactNode)

interface DialogBuilder {
  insert(child: Inner): DialogBuilder
  open(): Promise<boolean>
}
```
### __Usage__
```
const createAlert = (title: string, text: string): Promise<boolean> => buildDialog({
  className: styles.container,
})
  .insert(
    <>
      <h1>{title}</h1>
      <p>{text}</p>
    </>
  )
  .open()
```
```
const createConfirm = (title: string, text: string): Promise<boolean> => buildDialog({
  className: styles.container,
})
  .insert((ok, cancle) => (
    <>
      <h1>{title}</h1>
      <p>{text}</p>
      <button type="button" onClick={ok}>확인</button>
      <button type="button" onClick={cancle}>취소</button>
    </>
  ))
  .open()
```

<br/>

## __`AlertProvider`__
Alert dialog를 띄웁니다.

|Context Prop|Type|Remark|
|---|---|---|
|createAlert|`({ ...props }: AlertHeaderProps) => Promise<boolean>`|새로운 Alert dialog를 요청합니다.|

### __Interface__
```
interface AlertHeaderProps {
  title?: string
  text: string
}
```
### __Usage__
```
export default function Comment() {
  ...
  const { createAlert } = useAlert()

  const onDeleteClick = async () => {
    ...
    const res = await fetch(`/api/comment/delete/${id}`)
    if (res.ok) {
      const { message } = await res.json()
      await createAlert({ text: message })
    }
    ...
  }

  return (
    ...
    <button type="button" onClick={onDeleteClick}>삭제</button>
    ...
  )
}
```

<br/>

## __`ConfirmProvider`__
Confirm dialog를 띄웁니다.

|Context Prop|Type|Remark|
|---|---|---|
|createConfirm|`({ ...props }: AlertHeaderProps) => Promise<boolean>`|새로운 Confirm dialog를 요청합니다.|

### __Interface__
```
interface AlertHeaderProps {
  title?: string
  text: string
}
```
### __Usage__
```
export default function Comment() {
  ...
  const { createConfirm } = useConfirm()

  const onDeleteClick = async () => {
    ...
    const ok = await createConfirm({
      title: '경고',
      text: '정말 삭제하시겠습니까?'
    })
    if (!ok) {
      return
    }
    ...
  }

  return (
    ...
    <button type="button" onClick={onDeleteClick}>삭제</button>
    ...
  )
}
```

<br/>

## __`PromptProvider`__
Prompt dialog를 띄웁니다.

|Context Prop|Type|Remark|
|---|---|---|
|createPrompt|`({ ...props }: AlertHeaderProps) => Promise<string>`|새로운 Prompt dialog를 요청합니다.|

### __Interface__
```
interface AlertHeaderProps {
  title?: string
  text: string
}
```
### __Usage__
```
export default function Comment() {
  ...
  const { createPrompt } = usePrompt()

  const onDeleteClick = async () => {
    ...
    const password = await createPrompt({
      text: '비밀번호를 입력하세요.'
    })
    
    const payload = {
      ...
      password,
    }
    ...
  }

  return (
    ...
    <button type="button" onClick={onDeleteClick}>삭제</button>
    ...
  )
}
```

<br />

## __Api__
---
## __`communicate({ url, payload, options, method }) : Promise<Response>`__
`fetch()`를 대신합니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|url|`string`|-|-|
|payload|`any`|`null`|-|
|options|`RequestInit`|`null`|-|
|method|`string`|`'GET'`|-|
### __Usage__
```
const res = await communicate({
  url: '/post', 
  payload : {
    title: 'S/Z',
    content: 'Hello World!',
  },
  method: 'POST'
)
```

<br />

## __`communicateWithContext({ context, url, payload, options, method }) : Promise<Response>`__
`GetServerSideProps` 환경에서 `communicate()`를 대신합니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|context|`GetServerSidePropsContext<ParsedUrlQuery>`|-|-|
|url|`string`|-|-|
|payload|`any`|`null`|-|
|options|`RequestInit`|`null`|-|
|method|`string`|`'GET'`|-|
### __Usage__
```
export const getServerSideProps : GetServerSideProps = async (context) => {
  const res = await communicateWithContext({
    context,
    url: '/user/1', 
  )
  ...
}
```

<br />

## __Server__
---
## __`getServerSideAuth(context) : Promise<{ authenticated : boolean }>`__
`GetServerSideProps` 환경에서 유저를 검증합니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|context|`GetServerSidePropsContext<ParsedUrlQuery>`|-|-|
### __Usage__
```
export const getServerSideProps : GetServerSideProps = async (context) => {
  const res = await getServerSideAuth(context)
  ...
}
```

<br />

## __Util__
---
## __`setCookie(name, value, ms) : void`__
쿠키를 저장합니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|name|`string`|-|-|
|value|`any`|-|-|
|ms|`number`|null|앞으로 만료될 기한을 ms 단위로 입력합니다.|
### __Usage__
```
setCookie('token', mytoken, 1000 * 60 * 60 * 24 * 7)
```

<br />

## __`getCookie(name) : string`__
쿠키를 불러옵니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|name|`string`|-|-|
### __Usage__
```
const token = getCookie('token')
```

<br />

## __`deleteCookie(name) : string`__
쿠키를 지웁니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|name|`string`|-|-|
### __Usage__
```
deleteCookie('token')
```

<br />

## __`getDeviceType() : 'tablet' | 'mobile' | 'desktop'`__
클라이언트의 기기 유형을 가져옵니다.
### __Usage__
```
const deviceType = getDeviceType()
```

<br />

## __`cn(...args)`__
`JSX.Element`를 사용하는 데에 있어서 복수의 className을 용이하게 입력할 수 있게끔 돕습니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|args|`(string or boolean)[]`|-|-|
### __Usage__
```
<section className={cn(styles.container, active && styles.active)}>
 ...
</section>
```

<br />

## __`getPosition(e): { x: number, y: number }`__
발생한 마우스 혹은 터치 이벤트의 좌표를 얻습니다.
|Property|Type|Default (Nullable)|Remark|
|---|---|---|---|
|e|`(MouseEvent or TouchEvent)`|-|-|
### __Usage__
```
const { x, y } = getPosition(e)
```


