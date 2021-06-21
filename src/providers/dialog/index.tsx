/* eslint-disable react/no-this-in-sfc */
import { useModalProvider } from 'providers/modal'
import React, {
  createContext, useContext, useState, useEffect,
} from 'react'
import Modal from 'src/components/modal'

type EventHandler = () => void

type Inner =
  | React.ReactNode
  | ((props: { ok?: EventHandler, cancle?: EventHandler }) => React.ReactNode)

interface DialogRequestProps {
  className?: string
}

interface IDialogRequest {
  insert(child: Inner): IDialogRequest
  open(): Promise<boolean>
}

interface DialogCallbackProps {
  ok: EventHandler
  cancle: EventHandler
}

export type DialogProviderProps = DialogCallbackProps & {
  className: string,
  inner: React.ReactNode
}

interface DialogProviderContextProps {
  buildDialog: (props? : DialogRequestProps) => IDialogRequest
}

const DialogProviderContext = createContext<DialogProviderContextProps>(null)

export const useDialog = () => useContext(DialogProviderContext)

export default function DialogProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const [requests, setRequests] = useState<DialogProviderProps[]>([])
  const { update } = useModalProvider()

  const finishRequest = (request: DialogProviderProps) => {
    setRequests((array) => array.filter((value) => value !== request))
  }

  class DialogRequest implements IDialogRequest {
    private inner: React.ReactNode
    private executions : {
      ok: Function
      cancle: Function
      close: Function
    }

    public className: string

    constructor({ className } : DialogRequestProps) {
      this.className = className
    }

    private executeOk() {
      this.executions.ok()
      this.executeClose()
    }

    private executeCancle() {
      this.executions.cancle()
      this.executeClose()
    }

    private executeClose() {
      this.executions.close()
    }

    public insert(inner : Inner): IDialogRequest {
      if (typeof inner === 'function') {
        this.inner = inner({
          ok: () => this.executeOk(),
          cancle: () => this.executeCancle(),
        })
        return this
      }
      this.inner = inner
      return this
    }

    public open(): Promise<boolean> {
      return new Promise<boolean>((resolve) => {
        const request = {
          className: this.className,
          inner: this.inner,
          ok: () => this.executeOk(),
          cancle: () => this.executeCancle(),
        }
        this.executions = {
          ok: () => resolve(true),
          cancle: () => resolve(false),
          close: () => finishRequest(request),
        }
        setRequests((array) => array.concat(request))
      })
    }
  }

  const buildDialog = (props? : DialogRequestProps): DialogRequest => new DialogRequest(props)

  const value = {
    buildDialog,
  }

  useEffect(() => {
    if (requests.length < 1) {
      update(false)
    }
  }, [requests])

  return (
    <DialogProviderContext.Provider value={value}>
      {children}
      {requests.map(({ className, inner, cancle }) => (
        <Modal
          className={className}
          key={Math.random()}
          immediate
          onOff={cancle}
        >
          {inner}
        </Modal>
      ))}
    </DialogProviderContext.Provider>
  )
}

DialogProvider.defaultProps = {
  children: null,
}
