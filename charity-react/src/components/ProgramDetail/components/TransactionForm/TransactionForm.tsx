import { Program } from '@/types/programs.type'
import { FC, ReactNode, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircleIcon } from 'lucide-react'
import { createTempTransaction } from '@/services/TransactionServices'
import { DialogTitle } from '@radix-ui/react-dialog'
import ProgramQrCode from '../ProgramQrCode'
import { BankInfo } from '@/types/charity.type'

interface TransactionFormProps {
  program: Program
  children: ReactNode
}

const CreateTransactionSchema = z.object({
  name: z.string().optional(),
})

const TransactionForm: FC<TransactionFormProps> = ({ program, children }) => {
  const [bankInfo, setBankInfo] = useState<BankInfo>({
    bank_account_name: '',
    bank_account_number: '',
    bank_name: '',
  })

  useEffect(() => {
    if (program) {
      setBankInfo(JSON.parse(program.charity.qr_code))
    }
  }, [program])
  const [open, setOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CreateTransactionSchema>>({
    resolver: zodResolver(CreateTransactionSchema),
    defaultValues: {
      name: '',
    },
  })

  const [code, setCode] = useState('')

  const onSubmit = async (data: z.infer<typeof CreateTransactionSchema>) => {
    setIsLoading(true)

    try {
      const createCharityRes = await createTempTransaction({
        name: data.name || 'Người dùng ẩn danh',
        programId: program.id,
      })
      if (createCharityRes.status === 201) {
        form.reset()

        setCode(createCharityRes.data.code)
        setOpen(false)
        return
      }
      toast.error('Tạo qr_code thất bại. Vui lòng thử lại sau.')
    } catch (error) {
      toast.error('Tạo qr_code thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader className="px-4">
            <DialogTitle className="text-center text-2xl font-bold">
              Nhập tên bạn để tạo mã QR
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full max-w-xl"
            >
              {/* Tên  */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập tên bạn (nếu muốn) </FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Nguyễn Văn A" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Nút submit */}
              <Button
                disabled={isLoading}
                className="cursor-pointer"
                type="submit"
              >
                {isLoading ? (
                  <LoaderCircleIcon className="animate-spin" />
                ) : (
                  'Tiếp tục'
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {bankInfo.bank_account_name && (
        <ProgramQrCode
          acountName={bankInfo.bank_account_name}
          bankId={bankInfo.bank_name}
          acountNo={bankInfo.bank_account_number}
          code={code}
          setCode={setCode}
        ></ProgramQrCode>
      )}
    </>
  )
}

export default TransactionForm
