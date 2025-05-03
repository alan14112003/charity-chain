import { ReactNode, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { initAuth, selectAuth, updateAuth } from '../../store/auth/auth.slice'
import { toast } from 'react-toastify'
import { getUserLS } from '../../utils/authLS'

type AuthGuardProp = {
  children: ReactNode
}

type AuthProviderProp = {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProp) => {
  const auth = useAppSelector(selectAuth)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (!auth.isAuthenticated && auth.isInitialized) {
      navigate('/login')
      toast.error('Bạn cần đang nhập để truy cập trang này')
    }
  }, [auth])

  return <>{children}</>
}

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // set auth store
    const user = getUserLS()
    if (user) {
      dispatch(
        updateAuth({
          isAuthenticated: true,
          user: user,
        })
      )
    } else {
      dispatch(initAuth())
    }
  }, [])

  return <>{children}</>
}
