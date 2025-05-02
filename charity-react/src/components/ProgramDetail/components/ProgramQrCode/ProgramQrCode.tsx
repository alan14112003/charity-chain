import { FC, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ProgramQrCodeProps {
  bankId: string
  acountNo: string
  acountName: string
  code?: string
  setCode: (data: string) => void
}

const ProgramQrCode: FC<ProgramQrCodeProps> = ({
  bankId,
  acountNo,
  acountName,
  code,
  setCode,
}) => {
  const [open, setOpen] = useState(false)

  const quickLink = ({
    BANK_ID,
    ACCOUNT_NO,
    ACCOUNT_NAME,
    DESCRIPTION,
  }: {
    BANK_ID: string
    ACCOUNT_NO: string
    ACCOUNT_NAME: string
    DESCRIPTION: string
  }) => {
    return `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?addInfo=${DESCRIPTION}&accountName=${ACCOUNT_NAME}`
  }

  useEffect(() => {
    if (code) {
      setOpen(true)
    }
  }, [code])

  return (
    <Dialog
      open={open}
      onOpenChange={(data) => {
        setOpen(data)
        if (!data) {
          setCode('')
        }
      }}
    >
      <DialogTrigger asChild>
        <div></div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-4">
          <DialogTitle className="text-center text-2xl font-bold">
            Quét mã QR bằng ứng dụng ngân hàng để quyên góp
          </DialogTitle>
          <div>
            {code && (
              <img
                src={quickLink({
                  BANK_ID: bankId,
                  ACCOUNT_NO: acountNo,
                  ACCOUNT_NAME: acountName,
                  DESCRIPTION: `ala${code}ala`,
                })}
                alt={`image for ${acountName}`}
              />
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProgramQrCode
