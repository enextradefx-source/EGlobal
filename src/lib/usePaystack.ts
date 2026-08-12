import { useCallback, useEffect, useState } from 'react'
import { PAYSTACK_PUBLIC_KEY } from '../config'

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void }
    }
  }
}

const SCRIPT_SRC = 'https://js.paystack.co/v1/inline.js'

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      resolve()
      return
    }
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    )
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Failed to load Paystack')))
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Paystack'))
    document.head.appendChild(script)
  })
}

interface PayWithPaystackOptions {
  email: string
  amountKobo: number
  onSuccess: () => void
  onClose?: () => void
}

export function usePaystack() {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!PAYSTACK_PUBLIC_KEY.startsWith('pk_')) return
    loadScript()
      .then(() => setReady(true))
      .catch(() => setReady(false))
  }, [])

  const pay = useCallback(
    (options: PayWithPaystackOptions) => {
      if (!window.PaystackPop) {
        loadScript()
          .then(() => setReady(true))
          .catch(() => setReady(false))
        return
      }
      setLoading(true)
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: options.email,
        amount: options.amountKobo,
        currency: 'NGN',
        ref: `ENX${Date.now().toString(36).toUpperCase()}`,
        onSuccess: () => {
          setLoading(false)
          options.onSuccess()
        },
        onCancel: () => {
          setLoading(false)
          options.onClose?.()
        },
      })
      handler.openIframe()
    },
    [],
  )

  return { pay, ready, loading, hasKey: PAYSTACK_PUBLIC_KEY.startsWith('pk_') }
}
