import { FC, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ProgramQrCodeProps {
  bankId: string
  acountNo: string
  acountName: string
  programCode: string
  children: ReactNode
}

const ProgramQrCode: FC<ProgramQrCodeProps> = ({
  bankId,
  acountNo,
  acountName,
  programCode,
  children,
}) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="px-4">
          <DialogDescription>
            <div>
              <img
                src={quickLink({
                  BANK_ID: bankId,
                  ACCOUNT_NO: acountNo,
                  ACCOUNT_NAME: acountName,
                  DESCRIPTION: programCode,
                })}
                alt={`image for ${acountName}`}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProgramQrCode
